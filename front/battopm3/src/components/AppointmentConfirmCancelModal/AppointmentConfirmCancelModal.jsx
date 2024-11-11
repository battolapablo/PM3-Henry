import styles from "./AppointmentConfirmCancelModal.module.css";

const AppointmentConfirmCancelModal = ({ message, onConfirm, onCancel }) => {
  if (!message) return null;

  return (
    <div className={`${styles.modalOverlay} ${styles.show}`}>
      <div className={styles.modalContent}>
        <button onClick={onCancel} className={styles.closeButton}>
          &times;
        </button>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.modalButton}>
            Confirmar
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmCancelModal;
