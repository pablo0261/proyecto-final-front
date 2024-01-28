import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserData } from "../../../redux/actions/index";
import validation from "../FormProfileProvider/validationFormProfile";

function Form() {
  const dispatch = useDispatch();
  const datosForm = useSelector((state) => state.datosForm);

  const [userData, setUserData] = useState({
    Servicio: "", // Corregir el nombre del campo a "Servicio"
    selectedOptions: [],
    inputValue: "",
    precioServicio: "", // Nuevo campo para el precio del servicio
  });

  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (datosForm.ServicesProviderCard) {
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

  const handleOptionSelect = (event) => {
    const selectedOption = event.target.value;

    if (!userData.selectedOptions.includes(selectedOption)) {
      setUserData({
        ...userData,
        selectedOptions: [...userData.selectedOptions, selectedOption],
      });
    }
  };

  const handleOptionDeselect = (selectedOption) => {
    const updatedOptions = userData.selectedOptions.filter(
      (option) => option !== selectedOption
    );

    setUserData({
      ...userData,
      selectedOptions: updatedOptions,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasErrors = Object.values(localErrors).some((error) => error !== "");

    if (hasErrors) {
      alert("Please fill in all the required fields correctly.");
    } else {
      // Actualizar el objeto userData antes de enviarlo al servidor
      const updatedUserData = {
        ...userData,
        precioServicio: userData.precioServicio.trim(), // Eliminar espacios en blanco alrededor del precio
      };

      dispatch(postUserData(updatedUserData))
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
          >
            Back
          </button>
          <button
            type="button"
            className="ReloadButton"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
          <h1 className="DetailTittle">Completa tu perfil</h1>
        </div>
        <div className="ContainerDivInput">
          <div>
            <div className="FormDivInput">
              <label className="FormLabel">Selecciona una opción:</label>
              <select onChange={handleOptionSelect}>
                {datosForm.ServicesProviderCard.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="SelectedOptions">
              {userData.selectedOptions.map((selectedOption) => (
                <div key={selectedOption} className="SelectedOption">
                  {selectedOption}
                  <button
                    type="button"
                    onClick={() => handleOptionDeselect(selectedOption)}
                  >
                    &#x2715;
                  </button>
                </div>
              ))}
            </div>
            {/* Nuevo campo para el precio del servicio */}
            <div className="FormDivInput">
              <label className="FormLabel">Precio del servicio (en pesos):</label>
              <input
                className="Inputs"
                type="text"
                name="precioServicio"
                value={userData.precioServicio}
                onChange={handleChange}
                placeholder=""
              />
              <div className="ErrorMessage">{localErrors.precioServicio}</div>
            </div>
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
