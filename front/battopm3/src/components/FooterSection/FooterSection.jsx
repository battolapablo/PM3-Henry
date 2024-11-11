import styles from "./FooterSection.module.css";

const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <button
          onClick={() => window.scrollTo(0, 0)}
          className={styles.topButton}>
          Volver arriba
        </button>
      </div>
      <div className={styles.center}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer">
          <img src="./face.svg" alt="Facebook" className={styles.icon} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer">
          <img src="./insta.svg" alt="Instagram" className={styles.icon} />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
          <img src="./twitter.svg" alt="X" className={styles.icon} />
        </a>
      </div>
      <div className={styles.right}>
        <p>
          Copyright © 2024 Todos los derechos reservados - BATTO Salud Integral
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
