import { useNavigate, useParams } from "react-router";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const DetalheDePessoas = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log("Save");
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  return (
    <LayoutBaseDePagina
      titulo="Detalhe de pessoa "
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmSalvar={handleSave}
          aoClicarEmApagar={handleDelete}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        ></FerramentasDeDetalhe>
      }
    >
      <p>DetalheDePessoa</p>
    </LayoutBaseDePagina>
  );
};
