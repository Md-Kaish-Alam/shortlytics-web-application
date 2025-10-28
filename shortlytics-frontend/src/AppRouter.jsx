import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";

import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import ShortenUrlPage from "./pages/ShortenUrlPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardLayout from "./components/Dashboard/DashboardLayout";

function Layout({ children }) {
  const location = useLocation();

  // pages where you don't want Navbar and Footer
  const hideLayout = ["/register", "/login"];

  const shouldHideLayout =
    hideLayout.includes(location.pathname) ||
    location.pathname.startsWith("/s/");

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
const AppRouter = () => {
  return (
    <Layout>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </Layout>
  );
};

export default AppRouter;

export const SubDomainRouter = () => {
  return (
    <Routes>
      <Route path="/s/:url" element={<ShortenUrlPage />} />
    </Routes>
  );
};
