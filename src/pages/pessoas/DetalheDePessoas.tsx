import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoaService } from "../../shared/services/api/pessoas/PessoasService";
import { VTextField } from "../../shared/forms";

interface IDetalhePessoa {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setisLoading] = useState(false);
  const [nome, setNome] = useState("");

  const handleSave = (dados: IDetalhePessoa) => {
    setisLoading(true);
    if (id === "nova") {
      PessoaService.create(dados).then((result) => {
        setisLoading(false);
        if (result instanceof Error) {
          console.log(result);
          alert(result.message);
        } else {
          navigate(`/pessoas/detalhe/${result}`);
        }
      });
    } else {
      PessoaService.updateById(Number(id), { id: Number(id), ...dados }).then(
        (result) => {
          setisLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          }
        }
      );
    }
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
          formRef.current?.setData(result);
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
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        ></FerramentasDeDetalhe>
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder="Nome completo" name="nomeCompleto" />
        <VTextField placeholder="Email" name="email" />
        <VTextField placeholder="Cidade id" name="cidadeId" />
      </Form>

      <p>DetalheDePessoa</p>
    </LayoutBaseDePagina>
  );
};
