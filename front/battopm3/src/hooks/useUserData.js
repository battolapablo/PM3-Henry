import { useState } from "react";

const useUserData = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return [userData, handleInputChange];
};

export default useUserData;
