export default function ButtonCopiarChavePix({ Chave_Pix }) {
  const Copiar_Texto = () => {
    const Input_Temporario = document.createElement("input");

    Input_Temporario.value = Chave_Pix;

    document.body.appendChild(Input_Temporario);

    Input_Temporario.select();

    document.execCommand("copy");

    document.body.removeChild(Input_Temporario);
  };

  return (
    <div>
      <button
        onClick={Copiar_Texto}
        className="Buttons_Cadastro_E_Pix Button_Pix_Copiar"
      >
        Copiar Pix
      </button>
    </div>
  );
}
