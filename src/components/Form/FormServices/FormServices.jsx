import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postUserData } from "../../../redux/actions/index";
import validation from "../FormProfileProvider/validationFormProfile";

function Form() {
  const dispatch = useDispatch();
  const datosForm = useSelector((state) => state.datosForm.ServicesProviderCard);

  const [userData, setUserData] = useState({
    "Cuidado": "",
    "Cuidado y Alimento": "",
    "Cuidado y Limpieza": "",
    selectedOptions: [], // Para almacenar las opciones seleccionadas
    inputValue: "", // Para almacenar el valor del campo de entrada
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

    // Actualizar el valor del campo de entrada
    setUserData({ ...userData, [property]: value });
    validation({ ...userData, [property]: value }, localErrors, setLocalErrors);
  };

  const handleOptionSelect = (event) => {
    const selectedOption = event.target.value;

    // Verificar si la opción ya está seleccionada
    if (!userData.selectedOptions.includes(selectedOption)) {
      // Agregar la opción a las seleccionadas
      setUserData({
        ...userData,
        selectedOptions: [...userData.selectedOptions, selectedOption],
      });
    }
  };

  const handleOptionDeselect = (selectedOption) => {
    // Filtrar las opciones seleccionadas para quitar la que se desea deseleccionar
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
              <label className="FormLabel">Servicio:</label>
              <input
                className="Inputs"
                type="text"
                name="Servicio"
                value={userData.Telefono}
                onChange={handleChange}
                placeholder=""
              />
              <div className="ErrorMessage">{localErrors.Telefono}</div>
            </div>

            {/* Agregar el campo select para las opciones */}
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

            {/* Mostrar las opciones seleccionadas */}
            <div className="SelectedOptions">
              {userData.selectedOptions.map((selectedOption) => (
                <div key={selectedOption} className="SelectedOption">
                  {selectedOption}
                  {/* Agregar la cruz para deseleccionar */}
                  <button
                    type="button"
                    onClick={() => handleOptionDeselect(selectedOption)}
                  >
                    &#x2715;
                  </button>
                </div>
              ))}
            </div>

            {/* Agregar el campo para completar con el valor total de las palabras seleccionadas */}
            <div className="FormDivInput">
              <label className="FormLabel">Total de palabras seleccionadas:</label>
              <input
                className="Inputs"
                type="text"
                name="totalPalabras"
                value={userData.selectedOptions.length}
                readOnly
              />
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
