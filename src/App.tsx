import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider } from "./shared/contexts";
import { DrawerProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <MenuLateral>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </MenuLateral>
      </DrawerProvider>
    </AppThemeProvider>
  );
};

export default App;
