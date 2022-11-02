import { Box, Button, Paper, useTheme, Icon, Divider } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe = ({
  textoBotaoNovo = "Novo",

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
}: IFerramentasDeDetalheProps) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {mostrarBotaoSalvar && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          onClick={aoClicarEmSalvar}
          startIcon={<SaveIcon />}
        >
          Salvar
        </Button>
      )}
      {mostrarBotaoSalvarEFechar && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={aoClicarEmSalvarEFechar}
          startIcon={<SaveIcon />}
        >
          Salvar e voltar
        </Button>
      )}
      {mostrarBotaoApagar && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={aoClicarEmApagar}
          startIcon={<DeleteIcon />}
        >
          Apagar
        </Button>
      )}
      {mostrarBotaoNovo && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          onClick={aoClicarEmNovo}
          startIcon={<AddIcon />}
        >
          {textoBotaoNovo}
        </Button>
      )}

      {mostrarBotaoVoltar && (
        <>
          <Divider variant="middle" orientation="vertical" />
          <Button
            color="primary"
            disableElevation
            variant="outlined"
            onClick={aoClicarEmVoltar}
            startIcon={<ArrowBackIcon />}
          >
            Voltar
          </Button>
        </>
      )}
    </Box>
  );
};
