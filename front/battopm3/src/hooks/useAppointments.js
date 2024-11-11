import { useState, useEffect } from "react";
import axios from "axios";

const useAppointments = (userId) => {
  const [turnos, setTurnos] = useState([]);
  const [selectedTurnoId, setSelectedTurnoId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userId) {
      axios
        .post(`http://localhost:3000/appointments/byUser`, { id: userId })
        .then((res) => setTurnos(res.data))
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, [userId]);
  const handleCancelTurno = async (id) => {
    try {
      await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
      setTurnos((prevTurnos) =>
        prevTurnos.map((turno) =>
          turno.id === id ? { ...turno, status: "Cancelado" } : turno
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const handleShowModal = (id) => {
    setSelectedTurnoId(id);
    setShowModal(true);
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  return {
    turnos,
    showModal,
    selectedTurnoId,
    handleCancelTurno,
    handleShowModal,
    handleCancelModal,
  };
};

export default useAppointments;
