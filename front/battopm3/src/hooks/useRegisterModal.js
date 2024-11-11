import { useState } from "react";

const useRegisterModal = () => {
  const [modalState, setModalState] = useState({
    isVisible: false,
    message: "",
    isSuccess: false,
  });

  const showModal = (message, isSuccess) => {
    setModalState({
      isVisible: true,
      message,
      isSuccess,
    });
  };

  const closeModal = () => {
    setModalState((prevState) => ({
      ...prevState,
      isVisible: false,
    }));
  };

  return [modalState, showModal, closeModal];
};

export default useRegisterModal;
