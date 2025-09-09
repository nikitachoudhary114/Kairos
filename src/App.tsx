import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import Activity from "./pages/Activity";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



function App() {


  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>

      <Footer/>
    </>
  );
}

export default App;
