import React from "react";
import styles from "./LogoutModal.module.css";

const LogoutModal = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Confirmar Cierre de Sesión</h2>
        <p>¿Estás seguro de que quieres cerrar sesión?</p>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.modalButton} ${styles.confirmButton}`}
            onClick={onConfirm}>
            Confirmar
          </button>
          <button
            className={`${styles.modalButton} ${styles.cancelButton}`}
            onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
