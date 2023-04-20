import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FormHandles } from "@unform/core";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { PessoaService } from "../../shared/services/api/pessoas/PessoasService";
import { useVForm, VForm, VTextField } from "../../shared/forms";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

interface IDetalhePessoa {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const { formRef, save, isSaveAndClose, saveAndClose } = useVForm();

  const [isLoading, setisLoading] = useState(false);
  const [nome, setNome] = useState("");

  const handleSave = (dados: IDetalhePessoa) => {
    setisLoading(true);
    if (id === "nova") {
      PessoaService.create(dados).then((result) => {
        setisLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          if (isSaveAndClose()) {
            navigate(`/pessoas`);
          } else {
            navigate(`/pessoas/detalhe/${result}`);
          }
        }
      });
    } else {
      PessoaService.updateById({ id: Number(id), ...dados }).then((result) => {
        setisLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          if (isSaveAndClose()) {
            navigate(`/pessoas`);
          }
        }
      });
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
    } else {
      formRef.current?.setData({
        email: "",
        cidadeId: "",
        nomeCompleto: "",
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
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmSalvar={save}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/pessoas")}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
        ></FerramentasDeDetalhe>
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="nomeCompleto"
                  disabled={isLoading}
                  label="Nome completo"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="email"
                  label="Email"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="Cidade"
                  name="cidadeId"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>

      <p>DetalheDePessoa</p>
    </LayoutBaseDePagina>
  );
};
