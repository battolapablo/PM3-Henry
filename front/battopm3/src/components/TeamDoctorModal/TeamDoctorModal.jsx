import React from "react";
import styles from "./TeamDoctorModal.module.css";

const TeamDoctorModal = ({ show, onClose, medico }) => {
  if (!show) return null;

  return (
    <div className={`${styles.modalOverlay} ${show ? styles.show : ""}`}>
      <div className={styles.modalContent}>
        <h2>{medico.name}</h2>
        <h3>{medico.specialty}</h3>
        <p>{medico.description}</p>
        <button className={styles.closeButton} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default TeamDoctorModal;
