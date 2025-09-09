import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import Admin from "./pages/Admin";
import PageNotFound from "./pages/PageNotFound";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { Advertising } from "./components/Advertising";
import { getUserTariff } from "./api/api";
import { lightTheme, darkTheme } from "./styles/theme";
import styled, { ThemeProvider } from "styled-components";
import "./i18n";

const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.app.background};
  max-width: 1440px;
  margin: auto;
`;

const showAdvertisingOnPages = ["/", "/service", "/about", "/contact"];

function App() {
  const location = useLocation();
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.value);
  const token = useSelector((state) => state.user.token);
  const tokenAdmin = useSelector((state) => state.admin.value);
  const isAdminPage = location.pathname === "/admin";
  const shouldShowAdvertising = showAdvertisingOnPages.includes(
    location.pathname
  );

  useEffect(() => {
    const fetchUserTariff = async () => {
      const response = await getUserTariff(token, t);
      if (response.success) {
        const premiumTariff =
          response.data.tariff === "family" ||
          response.data.tariff === "business";
        if (premiumTariff) {
          setIsPremiumUser(premiumTariff);
        } else {
          setIsPremiumUser(false);
        }
      }
    };

    if (token) {
      fetchUserTariff();
    }
  }, [token]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Container>
          {(!isAdminPage || tokenAdmin) && <Navigation />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={!token ? <Login /> : <Navigate to="/user" />}
            />
            <Route
              path="/user"
              element={token ? <UserDashboard /> : <Navigate to="/login" />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {shouldShowAdvertising && !isPremiumUser && <Advertising />}
          {(!isAdminPage || tokenAdmin) && <Footer />}
        </Container>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
