import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AppThemeProvider>
      <MenuLateral>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MenuLateral>
    </AppThemeProvider>
  );
};

export default App;
