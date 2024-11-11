import styles from "../Login/Login.module.css";
import { useNavigate } from "react-router-dom";
import NotificationLogin from "../../components/NotificationLogin/NotificationLogin";
import useHandleInputChange from "../../hooks/useHandleInputChange";
import useHandleSubmit from "../../hooks/useHandleSubmit";

const Login = () => {
  const navigate = useNavigate();

  const [userData, errors, handleInputChange] = useHandleInputChange();
  const {
    handleOnSubmit,
    notification,
    closeNotification,
    handleNotificationConfirm,
  } = useHandleSubmit(userData, errors, navigate);

  const handleForgotPasswordClick = () => {
    notification.showNotification(
      "El sector se encuentra en mantenimiento.",
      "info"
    );
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleOnSubmit} className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup}>
          <label>Usuario:</label>
          <input
            type="text"
            value={userData.username}
            name="username"
            placeholder="example@gmail.com"
            className={styles.inputField}
            onChange={handleInputChange}
          />
          {errors.username && (
            <p className={styles.errorText}>{errors.username}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={userData.password}
            name="password"
            placeholder="Contraseña"
            className={styles.inputField}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Ingresar
        </button>
        <div className={styles.linkContainer}>
          <a
            href="#"
            className={styles.linkText}
            onClick={handleForgotPasswordClick}>
            Olvidé mi contraseña
          </a>
          <a href="/register" className={styles.linkText}>
            Registrarse
          </a>
        </div>
      </form>
      {notification.visible && (
        <NotificationLogin
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
          onConfirm={handleNotificationConfirm}
        />
      )}
    </div>
  );
};

export default Login;
