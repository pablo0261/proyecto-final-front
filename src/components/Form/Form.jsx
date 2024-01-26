import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserData } from "../../redux/actions/index";
import { useParams } from "react-router-dom";
import validation from "./validation";
import "./Form.style.css";

function Form() {
  const dispatch = useDispatch();
  const datosPeople = useSelector((state) => state.datosPeople);
  const { component } = useParams();

  console.log("component", component)
  const [userData, setUserData] = useState({})
  console.log("userData", userData)

  useEffect(() => {
    if (component === "1" && datosPeople.ProfileProvider) {
      setUserData({ ...datosPeople.ProfileProvider });
    } else if (component === "2" && datosPeople.ServicesProviderCard) {
      setUserData({ ...datosPeople.ServicesProviderCard });
    } else if (component === "3" && datosPeople.EducationExperienciaProvider) {
      setUserData({ ...datosPeople.EducationExperienciaProvider });
    }
     else if (component === "4" && datosPeople.InteresProviderCard) {
      setUserData({ ...datosPeople.InteresProviderCard });
    }
     else if (component === "5" && datosPeople.SkillsProviderCard) {
      setUserData({ ...datosPeople.SkillsProviderCard });
    }
  }, []);

  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (datosPeople.ProfileProvider) {
      setUserData((prevUserData) => ({
        ...prevUserData,
      }));
    }
  }, []);

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


  const formFields = Object.keys(userData).map((key) => ({
    label: key,
    name: key,
    type: "text",
    placeholder: "",
  }));

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
