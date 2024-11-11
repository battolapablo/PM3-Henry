import { useState, useEffect } from "react";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection";
import MedicalCoverageSection from "../../components/MedicalCoverageSection/MedicalCoverageSection";
import ModalHome from "../../components/ModalHome/ModalHome";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <AboutUsSection />
      <MedicalCoverageSection />
      {showModal && <ModalHome onClose={handleCloseModal} />}
    </>
  );
};

export default Home;
