import { Button } from "@mui/material";
import { Home, People } from "@mui/icons-material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../shared/contexts";
import { Dashboard, ListagemDePessoas, DetalheDePessoas } from "../pages";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { icon: <Home />, path: "/pagina-inicial", label: "Página inicial" },
      { icon: <People />, path: "/pessoas", label: "Pessoas" },
      { icon: <LocationCityIcon />, path: "/cidades", label: "Cidades" },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
