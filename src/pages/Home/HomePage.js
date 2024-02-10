import "./style.css";
import Cabecario from "../../components/Cabecario";
import BeneficiosDoPremium from "../../components/BeneficiosDoPremium";

export default function HomePage() {
  return (
    <div className="Corpo_Site">
      <div className="Degrade_Inicio_Site ">
        <div className="Degrade_Fim_Site">
          <Cabecario />
          <BeneficiosDoPremium />
        </div>
      </div>
    </div>
  );
}
