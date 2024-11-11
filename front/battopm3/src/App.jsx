import Home from "./views/Home/Home";
import "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import FooterSection from "./components/FooterSection/FooterSection";
import MyAppointments from "./views/MyAppointments/MyAppointments";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import { Routes, Route } from "react-router-dom";
import ContactSection from "./components/ContactSection/ContactSection";
import TeamDoctorSection from "./components/TeamDoctorSection/TeamDoctorSection";
import CreateAppointments from "./views/CreateAppointments/CreateAppointments";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointments" element={<MyAppointments />} />
          <Route
            path="/appointments/schedule"
            element={<CreateAppointments />}
          />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/equipomedico" element={<TeamDoctorSection />} />
        </Route>
      </Routes>
      <FooterSection />
    </>
  );
}

export default App;
