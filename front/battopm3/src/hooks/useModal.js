import { useState } from "react";

const useModal = (initialMessage = "", initialVisible = false) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [message, setMessage] = useState(initialMessage);

  const showModal = (newMessage = "") => {
    setMessage(newMessage);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setMessage("");
  };

  return { isVisible, message, showModal, hideModal };
};

export default useModal;
