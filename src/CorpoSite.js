import "./StylePadrao.css";
import HomePage from "./pages/Home/HomePage";
import Assinatura from "./pages/Assinatura/AssinaturaInformacoesPessoais";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function CorpoSite() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Assinatura" element={<Assinatura />} />
      </Routes>
    </BrowserRouter>
  );
}
