import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAppointmentForm = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const userId = useSelector((state) => state.auth.user.id);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const times = [];
    const startTime = 9;
    const endTime = 17;
    for (let hour = startTime; hour < endTime; hour++) {
      times.push(`${hour.toString().padStart(2, "0")}:00`);
      times.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    times.push(`${endTime.toString().padStart(2, "0")}:00`);
    setAvailableTimes(times);
  }, []);

  const isValidDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    const diffInDays = (selectedDate - today) / (1000 * 3600 * 24);

    return (
      diffInDays >= 1 &&
      diffInDays <= 14 &&
      selectedDate.getDay() !== 0 &&
      selectedDate.getDay() !== 6
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidDate(date)) {
      setModalMessage(
        "Seleccione una fecha válida (1 a 14 días a partir de mañana, sin sábados o domingos)."
      );
      setIsError(true);
      setShowModal(true);
      return;
    }

    setShowModal(true);
    setModalMessage("¿Estás seguro de que deseas crear este turno?");
    setIsError(false);
  };

  const handleConfirmCreate = async () => {
    const appointmentData = {
      date,
      time,
      reason,
      userId,
    };

    try {
      await axios.post(
        "http://localhost:3000/appointments/schedule",
        appointmentData
      );
      setModalMessage("Turno creado exitosamente!!");
      setIsError(false);
      setTimeout(() => navigate("/appointments"), 2000);
    } catch (error) {
      console.error("Error al crear el turno:", error);
      setModalMessage("Hubo un error al crear el turno.");
      setIsError(true);
    }
  };

  const handleCancelModal = () => {
    setShowModal(false);
  };

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return {
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
  };
};

export default useAppointmentForm;
