import React from "react";
import styles from "./AppointmentCreateModal.module.css";
import useToggle from "../../hooks/useToggle";
import useMessage from "../../hooks/useMessage";

const AppointmentCreateModal = ({ message, onConfirm, onCancel, isError }) => {
  const [showMessage, toggleShowMessage] = useToggle(false);
  const [buttonsVisible, toggleButtonsVisible] = useToggle(true);
  const [displayMessage, updateMessage] = useMessage(message);

  const handleConfirmClick = () => {
    toggleButtonsVisible(false);
    updateMessage("Turno creado exitosamente!!");
    onConfirm();
  };

  return (
    <div className={`${styles.modalOverlay} ${styles.show}`}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onCancel}>
          ×
        </button>
        <div
          className={`${styles.modalMessage} ${
            showMessage ? styles.show : styles.hide
          } ${isError ? styles.errorMessage : styles.successMessage}`}>
          {displayMessage}
        </div>
        {buttonsVisible && (
          <div className={styles.buttonGroup}>
            {!isError ? (
              <>
                <button
                  className={styles.modalButton}
                  onClick={handleConfirmClick}>
                  Aceptar
                </button>
                <button
                  className={`${styles.modalButton} ${styles.cancelButton}`}
                  onClick={onCancel}>
                  Cancelar
                </button>
              </>
            ) : (
              <button className={styles.modalButton} onClick={onCancel}>
                Aceptar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCreateModal;
