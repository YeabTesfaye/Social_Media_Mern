import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import ProfilePage from "./pages/profilePage/Profile";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import NotFoud from "./components/NotFoud";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token))
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={ isAuth ? <HomePage /> : <Navigate to='/' />} />
          <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to='/' />} />
          <Route path="*" element={<NotFoud />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
