import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserData } from "../../../redux/actions/index";
import validation from "./../FormProfileProvider/validationFormProfile";

function Form({ handleClickForm}) {
  const dispatch = useDispatch();
  const datosForm = useSelector((state) => state.datosForm);

  const [userData, setUserData] = useState({});
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (datosForm.ProfileProvider) {
      setUserData((prevUserData) => ({
        ...prevUserData,
      }));
    }
  }, [datosForm]);

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

  const handleReloadClick = () => {
    setUserData({});
    setLocalErrors({});
  };

  return (
    <div className="background">
      <form className="Form" onSubmit={handleSubmit}>
        <div className="DivButtonTittle">
          <button
            type="button"
            className="DetailButtonForm"
            onClick={handleClickForm}
          >
            Back
          </button>
          <button
            type="button"
            className="ReloadButton"
            onClick={handleReloadClick}
          >
            Reload
          </button>
          <h1 className="DetailTittle">Completa tu perfil</h1>
        </div>
        <div className="ContainerDivInput">
          <div className="FormDivInput">
            <label className="FormLabel">Nombre:</label>
            <input
              className="Inputs"
              type="text"
              name="Nombre"
              value={userData.Nombre}
              onChange={handleChange}
              placeholder=""
            />
            <div className="ErrorMessage">{localErrors.Nombre}</div>
          </div>
          <div>
            <div className="FormDivInput">
              <label className="FormLabel">Telefono:</label>
              <input
                className="Inputs"
                type="text"
                name="Telefono"
                value={userData.Telefono}
                onChange={handleChange}
                placeholder=""
              />
              <div className="ErrorMessage">{localErrors.Telefono}</div>
            </div>

            <div className="FormDivInput">
              <label className="FormLabel">País:</label>
              <input
                className="Inputs"
                type="text"
                name="País"
                value={userData.País}
                onChange={handleChange}
                placeholder=""
              />
              <div className="ErrorMessage">{localErrors.País}</div>
            </div>

            <div className="FormDivInput">
              <label className="FormLabel">Provincia:</label>
              <input
                className="Inputs"
                type="text"
                name="Provincia"
                value={userData.Provincia}
                onChange={handleChange}
                placeholder=""
              />
              <div className="ErrorMessage">{localErrors.Provincia}</div>
            </div>

            <div className="FormDivInput">
              <label className="FormLabel">Localidad:</label>
              <input
                className="Inputs"
                type="text"
                name="Localidad"
                value={userData.Localidad}
                onChange={handleChange}
                placeholder=""
              />
              <div className="ErrorMessage">{localErrors.Localidad}</div>
            </div>
          </div>
          <div className="FormDivInput">
            <label className="FormLabel">Calle:</label>
            <input
              className="Inputs"
              type="text"
              name="Calle"
              value={userData.Calle}
              onChange={handleChange}
              placeholder=""
            />
            <div className="ErrorMessage">{localErrors.Calle}</div>
          </div>

          <div className="FormDivInput">
            <label className="FormLabel">Ocupación:</label>
            <input
              className="Inputs"
              type="text"
              name="Ocupación"
              value={userData.Ocupación}
              onChange={handleChange}
              placeholder=""
            />
            <div className="ErrorMessage">{localErrors.Ocupación}</div>
          </div>

          <div className="FormDivInput">
            <label className="FormLabel">Sobre mi:</label>
            <input
              className="Inputs"
              type="text"
              name="Sobre mi"
              value={userData["Sobre mi"]}
              onChange={handleChange}
              placeholder=""
            />
            <div className="ErrorMessage">{localErrors["Sobre mi"]}</div>
          </div>

          {Object.values(localErrors).every((error) => error === "") &&
            Object.values(userData).some((value) => value === "") && (
              <button className="ButtonForm" type="submit">
                Guardar
              </button>
            )}
        </div>
      </form>
    </div>
  );
}

export default Form;
