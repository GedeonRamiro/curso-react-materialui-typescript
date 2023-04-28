import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { IVFormErrors, useVForm, VForm, VTextField } from "../../shared/forms";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import * as yup from "yup";

interface IFormData {
  nome: string;
}

const formValidationSchema = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const DetalheDeCidades = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  const { formRef, save, isSaveAndClose, saveAndClose } = useVForm();

  const [isLoading, setisLoading] = useState(false);
  const [nome, setNome] = useState("");

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setisLoading(true);
        if (id === "nova") {
          CidadesService.create(dadosValidados).then((result) => {
            setisLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate(`/cidades`);
              } else {
                navigate(`/cidades/detalhe/${result}`);
              }
            }
          });
        } else {
          CidadesService.updateById({ id: Number(id), ...dadosValidados }).then(
            (result) => {
              setisLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate(`/cidades`);
                }
              }
            }
          );
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};
        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      //eslint-disable-line
      navigate("/cidades");
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/cidades");
        }
      });
    }
  };

  useEffect(() => {
    if (id !== "nova") {
      setisLoading(true);
      CidadesService.getById(Number(id)).then((result) => {
        setisLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/cidades");
        } else {
          setNome(result.nome);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nome: "",
      });
    }
  }, [id]);

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova Cidade" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmSalvar={save}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmVoltar={() => navigate("/cidades")}
          aoClicarEmNovo={() => navigate("/cidades/detalhe/nova")}
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
                  name="nome"
                  disabled={isLoading}
                  label="Nome"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
