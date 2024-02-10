import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import styles from "../AdminServices/AdminServices.module.sass"

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [
  createOption('Oneasdasdasdasdasd'),
  createOption('Two'),
  createOption('Three'),
];

const AdminServices = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState(null);

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
  };

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
