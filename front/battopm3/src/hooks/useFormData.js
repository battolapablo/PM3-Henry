import { useState } from "react";

const useFormData = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetFormData = () => setFormData(initialState);

  return [formData, handleInputChange, resetFormData];
};

export default useFormData;
