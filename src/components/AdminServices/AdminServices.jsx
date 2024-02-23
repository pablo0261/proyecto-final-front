import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import styles from "../AdminServices/AdminServices.module.sass"
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { getFiltersOrdersDB } from '../../redux/actions';

const AdminServices = (props) => {

  const { idCategorie, categoriesOptions } = props
  const dispatch = useDispatch()
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL

  const [options, setOptions] = useState(categoriesOptions.map(option => {
    const newOption = {
      label: option.description
    }
    return newOption
  }))

  useEffect(() => {
    setOptions(categoriesOptions.map(option => {
      const newOption = {
        label: option.description
      }
      return newOption
    }))
  }, [categoriesOptions])

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const handleCreate = async (inputValue) => {
    try {
      const newOptionDB = {
        idCategorie: idCategorie,
        description: inputValue
      }
      const response = await axios.post(`${REACT_APP_API_URL}/categories/options`, newOptionDB);
      if (response.status === 200) {
        dispatch(getFiltersOrdersDB())
        Swal.fire({
          title: 'Categoria agregada con exito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'No se pudo agregar la categoria',
        footer: `${error.response.data}`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleDelete = async () => {
    const optionFinded = categoriesOptions.find(categorie => categorie.description === value.label);
    const deleteOption = {
      idOption: optionFinded.idOption
    }
    try {
      const deleted = await axios.delete(`${REACT_APP_API_URL}/categories/options`, { data: deleteOption });
      if (deleted.status === 200) {
        dispatch(getFiltersOrdersDB())
        setValue("")
        Swal.fire({
          title: 'Categoria eliminada con exito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error al Eliminar',
        footer: `${error.response.data.error}`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const styleSelect = {
    control: (styles, { isSelected, isFocused }) => ({
      ...styles,
      border: isFocused ? '2px solid #F2B138' : '1px solid #A64208',
      borderRadius: '10px',
      outline: 'none',
      boxShadow: 'none',
      '&:hover': {
      }
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isFocused
        ? '#ffc19b'
        : null,
      color: isFocused
        ? '#730707'
        : null,
    })
  }

  return (
    <div className={styles.container}>
      <CreatableSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => setValue(newValue)}
        onCreateOption={handleCreate}
        options={options}
        value={value}
        placeholder={""}
        styles={styleSelect}
        className={styles.select} />
      < button onClick={() => handleDelete()}>Delete</button>
    </div>
  );
};

export default AdminServices;