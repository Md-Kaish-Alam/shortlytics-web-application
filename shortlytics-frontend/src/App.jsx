import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";

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

function App() {
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
}

export default App;
