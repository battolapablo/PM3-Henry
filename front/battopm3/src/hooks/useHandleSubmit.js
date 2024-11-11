import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import useNotification from "./useNotification";
import useErrors from "./useErrors";

const useHandleSubmit = (userData, errors, navigate) => {
  const dispatch = useDispatch();
  const [notification, showNotification, closeNotification] = useNotification();
  const validateFields = useErrors(userData)[1];

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateFields();

    if (Object.keys(validationErrors).some((key) => validationErrors[key])) {
      return showNotification("Hay errores en los datos ingresados", "error");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        userData
      );
      showNotification("¡Login exitoso!", "success");
      dispatch(login(response.data.user));
    } catch (error) {
      showNotification(
        "Error en el login: " + error.response.data.message,
        "error"
      );
    }
  };

  const handleNotificationConfirm = () => {
    if (notification.type === "success") {
      navigate("/");
    }
    closeNotification();
  };

  return {
    handleOnSubmit,
    notification,
    closeNotification,
    handleNotificationConfirm,
  };
};

export default useHandleSubmit;
