import { useState } from "react";
import { useDispatch } from "react-redux";
import { postUserData } from "../../redux/actions/index";
import validation from "./validation";
import "./Form.style.css";

function Form() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    aboutMe: "",
    name: "",
    address: "",
    imageId: "utils/Imagenpersona.jpeg",
    age: "",
    country: "",
    state: "",
    profesion: "",
    phone: "",
  });

  const [localErrors, setLocalErrors] = useState({});


  const formFields = [
    { label: "name", name: "name", type: "text", placeholder: "" },
    { label: "aboutMe", name: "aboutMe", type: "text", placeholder: "" },
    { label: "address", name: "address", type: "text", placeholder: "" },
    { label: "age", name: "age", type: "text", placeholder: "" },
    { label: "profesion", name: "profesion", type: "text", placeholder: "" },
    { label: "Height Max", name: "heightMax", type: "text", placeholder: "" },
    { label: "phone", name: "phone", type: "text", placeholder: "" },
  ];

  const handleChange = (event) => {
    let property = event.target.name;
    let value = event.target.value.trim();
    setUserData({ ...userData, [property]: value });
    validation({ ...userData, [property]: value }, localErrors, setLocalErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasErrors = Object.values(localErrors).some((error) => error !== "");

    if (hasErrors) {
      alert("Please fill in all the required fields correctly.");
    } else {
      dispatch(postUserData(userData))
        .then(() => {
          alert("El Formulario se cargó correctamente");
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.error);
          if (error.error) {
            alert(error.error);
          } else {
            alert("No fue posible cargar su formulario");
          }
          console.error("Error al enviar el formulario", error);
        });
    }
  };

  return (
    <div className="background">
      <form className="Form" onSubmit={handleSubmit}>
        <div className="DivButtonTittle">
          <button
            type="button"
            className="DetailButtonForm"
            onClick={() => window.history.back()}
          >Back</button>
          <button
            type="button"
            className="ReloadButton"
            onClick={() => window.location.reload()}
          >Reload</button>
          <h1 className="DetailTittle">Completa tu perfil</h1>
        </div>
        <div className="ContainerDivInput">
          {formFields.map((field) => (
            <div key={field.name} className="FormDivInput">
              <label className="FormLavel">{field.label}:</label>
              <input
                className="Inputs"
                type={field.type}
                name={field.name}
                value={userData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
              <div className="ErrorMessage">{localErrors[field.name]}</div>
            </div>
          ))}

          {Object.values(localErrors).every((error) => error === "") &&
            Object.values(userData).some((value) => value === "") && (
              <button className="ButtonFomr" type="submit">
                Send
              </button>
            )}
        </div>
      </form>
    </div>
  );
}

export default Form;
