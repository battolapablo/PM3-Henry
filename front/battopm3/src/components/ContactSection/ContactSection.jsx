import styles from "./ContactSection.module.css";

const ContactoSection = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      "El sector se encuentra en mantenimiento. Por favor, intente más tarde."
    );
  };

  return (
    <div className={styles.contactSection}>
      <h2 className={styles.title}>Contácto</h2>
      <hr />
      <div className={styles.content}>
        <div className={styles.textInfo}>
          <p>Avenida Cabildo 1237, 1er piso, Buenos Aires, Argentina</p>
          <p>+54-47841105</p>
          <p>WhatsApp +54-11960509646</p>
          <p>info@battosaludintegral.com.ar</p>
        </div>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            className={styles.inputField}
          />
          <input
            type="text"
            placeholder="Teléfono"
            className={styles.inputField}
          />
          <input
            type="email"
            placeholder="Dirección de correo electrónico"
            className={styles.inputField}
          />
          <textarea
            placeholder="Mensaje"
            className={styles.textArea}></textarea>
          <button type="submit" className={styles.submitButton}>
            Enviar
          </button>
        </form>
      </div>
      <hr />
    </div>
  );
};

export default ContactoSection;
