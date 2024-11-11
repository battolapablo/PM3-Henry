import React from "react";
import styles from "./CreateAppointments.module.css";
import AppointmentCreateModal from "../../components/AppointmentCreateModal/AppointmentCreateModal";
import useAppointmentForm from "../../hooks/useAppointmentForm";

const CreateAppointments = () => {
  const {
    date,
    setDate,
    time,
    setTime,
    reason,
    setReason,
    availableTimes,
    showModal,
    modalMessage,
    isError,
    handleSubmit,
    handleConfirmCreate,
    handleCancelModal,
    getTomorrowDate,
  } = useAppointmentForm();
  const isFormComplete = date && time && reason;

  return (
    <div className={styles.createAppointmentContainer}>
      <h2 className={styles.title}>Crear Turno Médico</h2>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Fecha:</label>
          <input
            className={styles.inputField}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={getTomorrowDate()}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Hora:</label>
          <select
            className={styles.inputField}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required>
            <option value="" disabled>
              Seleccione un horario
            </option>
            {availableTimes.map((timeSlot) => (
              <option key={timeSlot} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Motivo:</label>
          <select
            className={styles.inputField}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required>
            <option value="" disabled>
              Seleccione un motivo
            </option>
            <option value="Consulta General">Consulta General</option>
            <option value="Atención Médico Ginecológico">
              Atención Médico Ginecológico
            </option>
            <option value="Control de Salud">Control de Salud</option>
            <option value="Consulta de Pediatría">Consulta de Pediatría</option>
            <option value="Consulta de Cardiología">
              Consulta de Cardiología
            </option>
            <option value="Consulta de Dermatología">
              Consulta de Dermatología
            </option>
            <option value="Consulta de Neurología">
              Consulta de Neurología
            </option>
            <option value="Consulta de Oftalmología">
              Consulta de Oftalmología
            </option>
            <option value="Consulta de Ortopedia">Consulta de Ortopedia</option>
            <option value="Consulta de Psiquiatría">
              Consulta de Psiquiatría
            </option>
            <option value="Control de Embarazo">Control de Embarazo</option>
            <option value="Vacunación">Vacunación</option>
            <option value="Consulta de Nutrición">Consulta de Nutrición</option>
            <option value="Examen Preoperatorio">Examen Preoperatorio</option>
            <option value="Chequeo Anual">Chequeo Anual</option>
            <option value="Consulta de Rehabilitación">
              Consulta de Rehabilitación
            </option>
            <option value="Consulta de Odontología">
              Consulta de Odontología
            </option>
            <option value="Consulta de Urología">Consulta de Urología</option>
            <option value="Consulta de Endocrinología">
              Consulta de Endocrinología
            </option>
          </select>
        </div>
        <button
          className={styles.submitButton}
          type="submit"
          disabled={!isFormComplete}>
          Agendar Turno
        </button>
      </form>
      {showModal && (
        <AppointmentCreateModal
          message={modalMessage}
          onConfirm={handleConfirmCreate}
          onCancel={handleCancelModal}
          isError={isError}
        />
      )}
    </div>
  );
};

export default CreateAppointments;
