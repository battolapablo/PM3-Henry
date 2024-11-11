import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterModal.module.css";

const RegisterModal = ({ isVisible, message, isSuccess, onClose }) => {
  const navigate = useNavigate();

  if (!isVisible) return null;

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }

    if (isSuccess) {
      navigate("/");
    }
  };

  const messageClass =
    message === "Procesando solicitud..."
      ? styles.processingMessage
      : isSuccess
      ? styles.successMessage
      : styles.errorMessage;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <h2 className={isSuccess ? styles.successTitle : styles.errorTitle}>
          {isSuccess ? "¡Éxito!" : "Procesando...."}
        </h2>
        <p className={messageClass}>{message}</p>
        <div className={styles.buttonGroup}>
          <button className={styles.modalButton} onClick={handleClose}>
            {isSuccess ? "Aceptar" : "Cerrar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
