import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToasterProvider } from "./components/ui/toaster";
import Activity from "./pages/Activity";



function App() {


  return (
    <>
      <Navbar />
      <ToasterProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>
      </ToasterProvider>

      <Footer />
    </>
  );
}

export default App;
