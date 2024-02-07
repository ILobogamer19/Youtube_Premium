const SRC_E_Texto_Json = await fetch("data/Beneficios.json");

const SRC_E_Texto = await SRC_E_Texto_Json.json();

export default function Beneficios() {
  return (
    <>
      {SRC_E_Texto.map((item) => {
        return (
          <div className={item.class ? item.class : ""} key={item.src + "3"}>
            <ytm-lp-small-feature-section-view-model key={item.src + item.text}>
              <div className="Container_Icon_Beneficios">
                <img className="Icon_Beneficios" src={item.src} />
              </div>
              <div className="Texto_Beneficios">{item.text}</div>
            </ytm-lp-small-feature-section-view-model>
          </div>
        );
      })}
    </>
  );
}
