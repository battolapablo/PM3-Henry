import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./ModalHome.module.css";

const ModalHome = ({ onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const [shouldShowModal, setShouldShowModal] = useState(false);

  useEffect(() => {
    const modalShown = sessionStorage.getItem("modalShown");

    if (!user && !modalShown) {
      const timer = setTimeout(() => {
        setShouldShowModal(true);
        sessionStorage.setItem("modalShown", "true");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!shouldShowModal) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          &times;
        </button>
        <h2>¡Únete a nuestra comunidad y disfruta de beneficios exclusivos!</h2>
        <p>
          Regístrate ahora para recibir ofertas personalizadas, contenido
          exclusivo y acceso prioritario a nuestras novedades. Además, podrás
          gestionar todas tus preferencias y datos de usuario de forma sencilla
          y segura.
        </p>
        <p>
          ¿Ya tienes una cuenta? Inicia sesión para aprovechar todas nuestras
          funcionalidades.
        </p>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => {
              onClose();
              window.location.href = "/register";
            }}
            className={styles.modalButton}>
            Registrate
          </button>
          <button
            onClick={() => {
              onClose();
              window.location.href = "/login";
            }}
            className={styles.modalButton}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHome;
