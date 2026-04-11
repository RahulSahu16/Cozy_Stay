import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import Navbar from "./components/NavBar/Navbar";
import AllHomesPage from "./pages/AllHomes";
import HomeDetails from "./pages/HomeDetails";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/AllHomes" element={<AllHomesPage />} />
        <Route path="/homes/:homeId" element={<HomeDetails />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;