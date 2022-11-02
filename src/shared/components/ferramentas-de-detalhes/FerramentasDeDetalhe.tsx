import {
  Box,
  Button,
  Skeleton,
  Paper,
  useTheme,
  Icon,
  Divider,
} from "@mui/material";
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

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;

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

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

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
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
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
      {mostrarBotaoSalvarCarregando && <Skeleton width={100} height={62} />}
      {mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && (
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
      {mostrarBotaoSalvarEFecharCarregando && (
        <Skeleton width={180} height={62} />
      )}
      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
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
      {mostrarBotaoApagarCarregando && <Skeleton width={100} height={62} />}
      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && (
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

      {mostrarBotaoNovoCarregando && <Skeleton width={100} height={62} />}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
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
      {mostrarBotaoVoltarCarregando && <Skeleton width={100} height={62} />}
    </Box>
  );
};
