import { useState } from "react";
import Modal from "../TeamDoctorModal/TeamDoctorModal";
import styles from "../TeamDoctorSection/TeamDoctorSection.module.css";

const TeamDoctorSection = () => {
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModal = (medico) => {
    setSelectedMedico(medico);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMedico(null);
  };
  const medicos = [
    {
      id: 1,
      name: "Prof. Dr. José María Méndez Ribas",
      specialty: "Médico Ginecólogo",
      description:
        "El Prof. Dr. José María Méndez Ribas es un destacado médico ginecólogo con más de 30 años de experiencia en el campo de la salud femenina. Ha dedicado su carrera a la investigación y el tratamiento de patologías ginecológicas complejas, siendo reconocido por su enfoque innovador en cirugías mínimamente invasivas. Como Profesor Consulto de Ginecología en la Universidad de Buenos Aires, ha formado a generaciones de médicos y ha contribuido significativamente a la mejora de los estándares en la atención ginecológica en América Latina. Además, es autor de numerosos artículos científicos y libros especializados que son referencia en la disciplina. Su compromiso con la salud de la mujer lo ha llevado a participar en proyectos humanitarios, ofreciendo su conocimiento en zonas de bajos recursos.",

      image: "../src/assets/medico2.jpg",
    },
    {
      id: 2,
      name: "Dra. María Rodríguez Pérez",
      specialty: "Médica Cardiologa",
      description:
        "La Dra. María Rodríguez Pérez es una reconocida especialista en cardiología intervencionista, con más de 20 años de experiencia en la realización de procedimientos complejos para el tratamiento de enfermedades cardiovasculares. Es conocida por su enfoque innovador y su dedicación a la investigación clínica, siendo una de las principales referentes en su campo dentro del Hospital Italiano.",
      image: "../src/assets/medico1.jpg",
    },
    {
      id: 3,
      name: "Dr. Carlos Andrés Villalba",
      specialty: "Médico Oncólogo",
      description:
        "El Dr. Carlos Andrés Villalba es un destacado oncólogo con una vasta trayectoria en el tratamiento integral del cáncer. Como Jefe del Servicio de Oncología en el Hospital Alemán, ha liderado programas pioneros en oncología personalizada, brindando a sus pacientes tratamientos avanzados y adaptados a sus necesidades específicas. Su compromiso con la medicina de precisión lo ha convertido en un referente en su especialidad.",
      image: "../src/assets/medico4.jpg",
    },
    {
      id: 4,
      name: "Dra. Laura Martín Salinas",
      specialty: "Médica Neuróloga",
      description:
        "La Dra. Laura Martín Salinas es una experta en neurología, especializada en el diagnóstico y tratamiento de trastornos del sueño. En la Clínica Fleni, ha desarrollado un enfoque integral para ayudar a sus pacientes a mejorar la calidad de su sueño, abordando desde problemas de insomnio hasta trastornos respiratorios durante el sueño. Su dedicación y cuidado hacia cada paciente han consolidado su reputación como una de las mejores especialistas en el área.",
      image: "../src/assets/medico3.jpg",
    },
    {
      id: 5,
      name: "Dr. Ricardo Esteban López",
      specialty: "Médico Pediatra",
      description:
        "El Dr. Ricardo Esteban López es un experimentado pediatra con un enfoque centrado en el bienestar y desarrollo de los niños. Como Profesor Asociado de Pediatría en la Universidad Austral, combina su pasión por la docencia con su práctica clínica, donde brinda atención médica de alta calidad a sus pequeños pacientes. Su empatía y conocimiento profundo de la medicina pediátrica lo han hecho merecedor de la confianza de innumerables familias.",
      image: "../src/assets/doc.jpg",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Equipo Médico</h1>
      <hr />
      <p className={styles.description}>
        Conformado por profesionales de renombre, nuestro equipo médico se
        dedica a brindar la mejor atención posible a nuestros pacientes.
      </p>
      {medicos.map((medico) => (
        <div key={medico.id} className={styles.card}>
          <img src={medico.image} alt={medico.name} className={styles.image} />
          <div className={styles.info}>
            <h2>{medico.name}</h2>
            <h3 className={styles.especialidad}>{medico.specialty}</h3>
            <button
              className={styles.button}
              onClick={() => handleShowModal(medico)}>
              Más información
            </button>
          </div>
        </div>
      ))}
      <Modal
        show={modalVisible}
        onClose={handleCloseModal}
        medico={selectedMedico}
      />
    </div>
  );
};

export default TeamDoctorSection;
