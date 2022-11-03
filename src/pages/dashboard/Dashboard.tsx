import { Box } from "@mui/material";
import { LayoutBaseDePagina } from "../../shared/layouts";
import {
  FerramentasDaListagem,
  FerramentasDeDetalhe,
} from "../../shared/components";

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      barraDeFerramentas={
        //<FerramentasDaListagem mostrarInputBusca textoBotaoNovo="Nova" />
        <FerramentasDeDetalhe mostrarBotaoSalvarEFecharCarregando />
      }
    >
      <Box>testeando</Box>
    </LayoutBaseDePagina>
  );
};
