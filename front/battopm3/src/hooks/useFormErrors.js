import { useState } from "react";
import {
  validateBirthdate,
  validateDNI,
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../helpers/validateRegister";

const useFormErrors = (formData) => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "birthdate":
        error = validateBirthdate(value);
        break;
      case "nDni":
        error = validateDNI(value);
        break;
      case "username":
        error = validateUsername(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      case "confirmPassword":
        error =
          value !== formData.password ? "Las contraseñas no coinciden" : "";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateAllFields = () => {
    const validationErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      birthdate: validateBirthdate(formData.birthdate),
      nDni: validateDNI(formData.nDni),
      username: validateUsername(formData.username),
      password: validatePassword(formData.password),
      confirmPassword:
        formData.confirmPassword !== formData.password
          ? "Las contraseñas no coinciden"
          : "",
    };

    setErrors(validationErrors);
    return validationErrors;
  };

  return [errors, validateField, validateAllFields];
};

export default useFormErrors;
