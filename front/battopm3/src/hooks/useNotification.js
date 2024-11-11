import { useState } from "react";

const useNotification = () => {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
      visible: true,
    });
  };

  const closeNotification = () => {
    setNotification((prevNotification) => ({
      ...prevNotification,
      visible: false,
    }));
  };

  return [notification, showNotification, closeNotification];
};

export default useNotification;
