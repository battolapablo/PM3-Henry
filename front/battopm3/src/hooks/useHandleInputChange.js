import useUserData from "./useUserData";
import useErrors from "./useErrors";

const useHandleInputChange = () => {
  const [userData, handleInputChange] = useUserData();
  const [errors, validateFields] = useErrors(userData);

  const handleChange = (event) => {
    handleInputChange(event);
    validateFields();
  };

  return [userData, errors, handleChange];
};

export default useHandleInputChange;
