import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { Advertising } from "./components/Advertising";
import { getUserTariff } from "./api/api";
import { lightTheme, darkTheme } from "./styles/theme";
import styled, { ThemeProvider } from "styled-components";
import "./i18n";

const Home = lazy(() => import("./pages/Home"));
const Service = lazy(() => import("./pages/Service"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const UserCarDetails = lazy(() => import("./pages/UserCarDetails"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background.default};
  color: ${({ theme }) => theme.colors.text.default};
  max-width: 1440px;
  margin: auto;
`;

const showAdvertisingOnPages = ["/", "/service", "/about", "/contact"];

const App = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <Container>
          {(!isAdminPage || tokenAdmin) && <Navigation />}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/service" element={<Service />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/car/:id"
                element={token ? <UserCarDetails /> : <PageNotFound />}
              />
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
          </Suspense>
          {shouldShowAdvertising && !isPremiumUser && <Advertising />}
          {(!isAdminPage || tokenAdmin) && <Footer />}
        </Container>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
