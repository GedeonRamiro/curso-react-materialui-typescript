import { Button } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { icon: <Home />, path: "/pagina-inicial", label: "Página inicial" },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <>
            <Button variant="contained" color="primary" onClick={toggleTheme}>
              Toggle Theme
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={toggleDrawerOpen}
            >
              Menu
            </Button>
          </>
        }
      />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
