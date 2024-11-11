import styles from "./NotificationLogin.module.css";

const NotificationLogin = ({ message, type, onClose, onConfirm }) => {
  if (!message) return null;

  const handleConfirm = () => {
    onConfirm();
  };
  const messageClass =
    type === "error"
      ? styles.errorMessage
      : type === "success"
      ? styles.successMessage
      : type === "info"
      ? styles.infoMessage
      : "";

  return (
    <div className={`${styles.modalOverlay} ${styles.show}`}>
      <div className={`${styles.modalContent} ${styles[type]}`}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <p className={`${styles.notificationMessage} ${messageClass}`}>
          {message}
        </p>
        <div className={styles.buttonGroup}>
          <button onClick={handleConfirm} className={styles.modalButton}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationLogin;
