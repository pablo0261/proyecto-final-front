import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import styles from "../AdminServices/AdminServices.module.scss"
import axios from 'axios';

const AdminServices = ({ categoriesOptions, idCategorie }) => {
  const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;
  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  });

  const defaultOptions = categoriesOptions ? categoriesOptions.map(option => createOption(option.description)) : [];

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState(null);
  const labelToSend = value && value.label;

  useEffect(() => {
    if (value !== null && !defaultOptions.some(option => option.label === value.label)) {
      setIsLoading(false);
      axios.post(`${REACT_APP_API_URL}/categories/options`, {
        "idCategorie": idCategorie,
        "description": labelToSend
      });
    }
  }, [value, options]);

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    const newOption = createOption(inputValue);
    setOptions((prev) => [...prev, newOption]);
    setValue(newOption);
    setIsLoading(false);
    // dispatch(lafuncioncreadoradelacategoria(idCategorie, labelToSend));
  };

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

        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary25: 'rgb(245, 245, 245)',
            primary: 'black',
          },
          
          control: {
            
            width: '800px',
          },
          
         
        })}


      />
      
      
      <button>Delete</button>
    </div>
  );
};

export default AdminServices;
