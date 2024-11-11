import { useState } from "react";
import {
  validateLoginUsername,
  validateLoginPassword,
} from "../helpers/validateLogin";

const useErrors = (userData) => {
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateFields = () => {
    const validationErrors = {
      username: validateLoginUsername(userData.username),
      password: validateLoginPassword(userData.password),
    };

    setErrors(validationErrors);
    return validationErrors;
  };

  return [errors, validateFields];
};

export default useErrors;
