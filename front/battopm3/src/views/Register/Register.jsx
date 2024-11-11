import styles from "./Register.module.css";
import axios from "axios";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import useFormData from "../../hooks/useFormData";
import useFormErrors from "../../hooks/useFormErrors";
import useRegisterModal from "../../hooks/useRegisterModal";

const Register = () => {
  const [formData, handleInputChange, resetFormData] = useFormData({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, validateField, validateAllFields] = useFormErrors(formData);
  const [modalState, showModal, closeModal] = useRegisterModal();

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateAllFields();

    if (Object.keys(validationErrors).some((key) => validationErrors[key])) {
      showModal("Hay errores en los datos ingresados", false);
      return;
    }

    showModal("Procesando solicitud...", false);

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        formData
      );

      showModal(
        "Registro exitoso, te enviamos un correo de confirmación",
        true
      );
      resetFormData();
    } catch (error) {
      console.error("Error en el registro:", error);
      showModal(
        "Hubo un problema al registrar el usuario. Intenta de nuevo.",
        false
      );
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleOnSubmit} className={styles.formContainer}>
        <h2 className={styles.title}>Registro</h2>
        <div className={styles.formGroup}>
          <label>Nombre:</label>
          <input
            type="text"
            value={formData.name}
            name="name"
            placeholder="Nombre completo"
            className={styles.inputField}
            onChange={(e) => {
              handleInputChange(e);
              validateField(e.target.name, e.target.value);
            }}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            name="email"
            placeholder="ejemplo@gmail.com"
            className={styles.inputField}
            onChange={(e) => {
              handleInputChange(e);
              validateField(e.target.name, e.target.value);
            }}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Fecha de nacimiento:</label>
          <input
            type="date"
            value={formData.birthdate}
            name="birthdate"
            className={styles.inputField}
            onChange={(e) => {
              handleInputChange(e);
              validateField(e.target.name, e.target.value);
            }}
          />
          {errors.birthdate && (
            <p className={styles.errorText}>{errors.birthdate}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>DNI:</label>
          <input
            type="text"
            value={formData.nDni}
            name="nDni"
            placeholder="DNI"
            className={styles.inputField}
            onChange={(e) => {
              handleInputChange(e);
              validateField(e.target.name, e.target.value);
            }}
          />
          {errors.nDni && <p className={styles.errorText}>{errors.nDni}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Usuario:</label>
          <input
            type="text"
            value={formData.username}
            name="username"
            placeholder="Usuario"
            className={styles.inputField}
            onChange={(e) => {
              handleInputChange(e);
              validateField(e.target.name, e.target.value);
            }}
          />
          {errors.username && (
            <p className={styles.errorText}>{errors.username}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={formData.password}
            name="password"
            placeholder="Contraseña"
            className={styles.inputField}
            onChange={(e) => {
              handleInputChange(e);
              validateField(e.target.name, e.target.value);
            }}
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={formData.confirmPassword}
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            className={styles.inputField}
            onChange={(e) => {
              handleInputChange(e);
              validateField(e.target.name, e.target.value);
            }}
          />
          {errors.confirmPassword && (
            <p className={styles.errorText}>{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Registrarse
        </button>
      </form>
      <RegisterModal
        isVisible={modalState.isVisible}
        message={modalState.message}
        isSuccess={modalState.isSuccess}
        onClose={closeModal}
      />
    </div>
  );
};

export default Register;
