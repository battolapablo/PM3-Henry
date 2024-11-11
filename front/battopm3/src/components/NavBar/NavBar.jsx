import { useState } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import LogoutModal from "../LogoutModal/LogoutModal";

const NavBar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsModalVisible(true);
  };

  const handleLogoutConfirm = () => {
    dispatch(logout());
    setIsModalVisible(false);
    navigate("/");
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <nav className={styles.navBar}>
        <div className={styles.logo}>BATTO Salud Integral</div>
        <div className={styles.menu}>
          <Link to="/" className={styles.menuItem}>
            Home
          </Link>
          <Link to="/equipomedico" className={styles.menuItem}>
            Equipo Médico
          </Link>
          <Link to="/contact" className={styles.menuItem}>
            Contacto
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/appointments"
                className={`${styles.menuItem} ${styles.active}`}>
                Mis turnos
              </Link>
              <Link
                to="/appointments/schedule"
                className={`${styles.menuItem} ${styles.active}`}>
                Agendar Turno
              </Link>
              <Link
                to="#"
                onClick={handleLogoutClick}
                className={styles.menuItem}>
                Cerrar sesión
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className={styles.menuItem}>
                Registrarse
              </Link>
              <Link
                to="/login"
                className={`${styles.menuItem} ${styles.active}`}>
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
      <LogoutModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default NavBar;
