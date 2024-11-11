import { useState } from "react";

const useMessage = (initialMessage = "") => {
  const [message, setMessage] = useState(initialMessage);

  const updateMessage = (newMessage) => {
    setMessage(newMessage);
  };

  return [message, updateMessage];
};

export default useMessage;
