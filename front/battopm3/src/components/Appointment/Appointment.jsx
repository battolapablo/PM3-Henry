import styles from "./Appointment.module.css";

const Appointment = ({ id, date, time, reason, status, onCancel }) => {
  return (
    <div
      className={`${styles.card} ${
        status === "Cancelado" ? styles.cancelado : styles.activo
      }`}>
      <h4>ID: {id}</h4>
      <h4>Fecha: {date}</h4>
      <h4>Horario: {time}</h4>
      <h4>Descripción: {reason}</h4>
      <h4 className={styles.status}>Estado: {status}</h4>
      {status !== "Cancelado" && (
        <button onClick={onCancel} className={styles.cancelButton}>
          Cancelar
        </button>
      )}
    </div>
  );
};

export default Appointment;
