import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import styles from "../AdminServices/AdminServices.module.sass"

const AdminServices = ({ categoriesOptions, idCategorie }) => {
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
    if (value) {
      setIsLoading(false);
      // dispatch(lafuncioncreadoradelacategoria(idCategorie, labelToSend));
      console.log(idCategorie);
      console.log(labelToSend);
       axios.post(`${REACT_APP_API_URL}/categories/options`, {
         "idCategorie": idCategorie,
         "description" : labelToSend
      });
    }
  }, [value]);

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    const newOption = createOption(inputValue);
    setOptions((prev) => [...prev, newOption]);
    setValue(newOption);
  };

  console.log(value);

  return (
    <div>
      <CreatableSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => setValue(newValue)}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
      <button>Delete</button>
    </div>
  );
};

export default AdminServices;
