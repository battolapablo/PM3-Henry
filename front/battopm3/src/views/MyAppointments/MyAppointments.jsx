import { useSelector } from "react-redux";
import styles from "./MyAppointments.module.css";
import Appointment from "../../components/Appointment/Appointment.jsx";
import AppointmentConfirmCancelModal from "../../components/AppointmentConfirmCancelModal/AppointmentConfirmCancelModal.jsx";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useAppointments from "../../hooks/useAppointments";

const MyAppointments = () => {
  const userId = useSelector((state) => state.auth.userId);

  useAuthRedirect();

  const {
    turnos,
    showModal,
    selectedTurnoId,
    handleCancelTurno,
    handleShowModal,
    handleCancelModal,
  } = useAppointments(userId);

  return (
    <div className={styles.maincontainer}>
      <h1>Mis turnos</h1>
      <h2 className={styles.maincontainer2}>
        Estos son los turnos del usuario
      </h2>
      {turnos.length > 0 ? (
        turnos.map((turno) => (
          <Appointment
            key={turno.id}
            id={turno.id}
            date={turno.date}
            time={turno.time}
            reason={turno.reason}
            status={turno.status}
            onCancel={() => handleShowModal(turno.id)}
          />
        ))
      ) : (
        <h2 className={styles.maincontainer2}>No tienes turnos agendados.</h2>
      )}
      {showModal && (
        <AppointmentConfirmCancelModal
          message="¿Estás seguro de que deseas cancelar este turno?"
          onConfirm={() => handleCancelTurno(selectedTurnoId)}
          onCancel={handleCancelModal}
        />
      )}
    </div>
  );
};

export default MyAppointments;



