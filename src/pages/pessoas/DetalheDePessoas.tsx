import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoaService } from "../../shared/services/api/pessoas/PessoasService";

export const DetalheDePessoas = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);
  const [nome, setNome] = useState("");

  const handleSave = () => {
    console.log("Save");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      //eslint-disable-line
      navigate("/pessoas");
      PessoaService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/pessoas");
        }
      });
    }
  };

  useEffect(() => {
    if (id !== "nova") {
      setisLoading(true);
      PessoaService.getById(Number(id)).then((result) => {
        setisLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
        }
      });
    }
  }, [id]);

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova Pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvarEFechar={handleSave}
          aoClicarEmSalvar={handleSave}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        ></FerramentasDeDetalhe>
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}

      <p>DetalheDePessoa</p>
    </LayoutBaseDePagina>
  );
};
