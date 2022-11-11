import { Button } from "@mui/material";
import { Home } from "@mui/icons-material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../shared/contexts";
import { Dashboard, ListagemDeCidade } from "../pages";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { icon: <Home />, path: "/pagina-inicial", label: "Página inicial" },
      { icon: <LocationCityIcon />, path: "/cidades", label: "Cidades" },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/cidades" element={<ListagemDeCidade />} />
      {/*   <Route path="/cidades/detalhes/:id" element={<ListagemDeCidade />} /> */}
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
