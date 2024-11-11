import styles from "./AboutUsSection.module.css";
import exampleImage from "../../assets/Medicina.jpg";

const AboutUsSection = () => {
  return (
    <div className={styles.aboutSection}>
      <div className={styles.imageContainer}>
        <img src={exampleImage} alt="CIM" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <h2>BATTO Salud Integral</h2>
        <p>
          Los profesionales de Batto Salud Integral hemos creado un espacio
          especialmente pensado para su cuidado y el de su familia. Entendemos
          que, en el ejercicio de nuestra profesión, el abordaje INTEGRAL del
          paciente es fundamental, son tan importantes los aspectos biológicos
          como los psicológicos y socioculturales. En nuestro accionar conjunto,
          enfatizamos lo prioritario del control en salud para la prevención y/o
          la detección temprana de las enfermedades. Además, entendemos el
          ejercicio de la medicina como el abordaje integral del paciente donde
          los aspectos biológicos tienen tanta importancia como los emocionales
          y su correspondiente interacción. Trabajamos en pleno Barrio de
          Belgrano en un policonsultorio con muy fácil acceso y a dos cuadras de
          la estación de subterráneo Línea D (José Hernández). La planta física
          de 100 m2 está diseñada para lograr un ambiente cálido, a lo que se
          agrega la música funcional y aire acondicionado central para su
          confort. A su vez, los consultorios están ubicados de tal manera que
          permiten el interactuar de los médicos de ser necesario. Tiene también
          un gabinete para estudios ginecológicos, obstétricos y mamarios que
          facilitan la rapidez diagnóstica. Administración: A cargo de Yñiguez
          Stefania Judith quien lo atenderán con idoneidad y afecto para
          resolverles todos los temas administrativos relacionados con la
          consulta y archivo de historias clínicas personalizadas. En BATTO
          Salud Integral contamos con TE directo, Whatsapp, recepción de
          mensajes, toma de Turnos On line, correo electrónico y brinda
          servicios informáticos de salud a través de redes sociales.
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;
