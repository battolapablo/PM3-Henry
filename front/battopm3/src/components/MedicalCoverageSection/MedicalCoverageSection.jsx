import styles from "./MedicalCoverageSection.module.css";

const MedicalCoverageSection = () => {
  const cards = [
    {
      id: 1,
      image: "../src/assets/SwissMedical.jpg",
      link: "https://www.swissmedical.com.ar/prepagaclientes/",
    },
    {
      id: 2,
      image: "../src/assets/OsdeMedicina.jpg",
      link: "https://www.osde.com.ar/",
    },
    {
      id: 3,
      image: "../src/assets/SancorSalud.jpg",
      link: "https://planessancorsalud.com.ar/",
    },
    {
      id: 4,
      image: "../src/assets/NobisMedical.jpg",
      link: "https://nobis.com.ar/",
    },
    {
      id: 5,
      image: "../src/assets/Medife.jpeg",
      link: "https://www.medife.com.ar/",
    },
  ];

  return (
    <section className={styles.coverageSection}>
      <h2 className={styles.title}>Coberturas Médicas</h2>
      <hr />
      <div className={styles.description}>
        ¿Qué seguros médicos atendemos?
        <p className={styles.descriptionText}>
          Hasta el presente pueden consultar los socios de las siguientes obras
          sociales. En caso de no pertenecer a ninguno de estos seguros médicos,
          pregunte cuáles son los aranceles por sistema de reintegro.
          <br />
          Honorarios accesibles para pacientes particulares.
        </p>
      </div>
      <div className={styles.cardsContainer}>
        {cards.map((card) => (
          <a key={card.id} href={card.link} className={styles.card}>
            <img
              src={card.image}
              alt={card.title}
              className={styles.cardImage}
            />
            <div className={styles.cardTitle}>{card.title}</div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default MedicalCoverageSection;
