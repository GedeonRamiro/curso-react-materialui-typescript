import { Box, Button, Paper, useTheme, Icon, Divider } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

export const FerramentasDeDetalhe = () => {
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
      <Button
        color="primary"
        disableElevation
        variant="contained"
        startIcon={<SaveIcon />}
      >
        Salvar
      </Button>
      <Button
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<SaveIcon />}
      >
        Salvar e voltar
      </Button>
      <Button
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={
          <Icon>
            <DeleteIcon />
          </Icon>
        }
      >
        Apagar
      </Button>
      <Button
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<AddIcon />}
      >
        Novo
      </Button>

      <Divider variant="middle" orientation="vertical" />

      <Button
        color="primary"
        disableElevation
        variant="outlined"
        startIcon={<ArrowBackIcon />}
      >
        Voltar
      </Button>
    </Box>
  );
};
