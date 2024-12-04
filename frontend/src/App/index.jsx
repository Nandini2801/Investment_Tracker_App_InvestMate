import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  LiveStockDataPage,
  LoginPage,
  Page404,
  PortfolioDetailsPage,
  PortfolioPage,
  WatchlistPage,
  ESGPage,
  StockInfoPage,
  TransactionHistoryPage,
  InvestingTrackerChatbot,
  DashboardPage,
  RegisterPage,
  AboutUs,
  ContactUs,
  // CreatePortfolioPage,
} from "../pages";
import { HeaderLayout } from "../components";
import HomePage from "../pages/HomePage";
import { useEffect, useState } from "react";
import ProtectedRoute from "../utils/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.getItem("token")
      ? setIsAuthenticated(true)
      : setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      window.document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollToTop();
  }, [pathname]);

  return (
    <Routes>
      {!localStorage.getItem("token") ||
      localStorage.getItem("token") === undefined ? (
        <Route path="/" element={<Navigate to="/home" />} />
      ) : (
        <Route path="/" element={<Navigate to="/dashboard" />} />
      )}
      {!localStorage.getItem("token") ||
      localStorage.getItem("token") === undefined ? (
        <Route path="*" element={<Navigate to="/login" />} />
      ) : (
        <Route path="*" element={<Page404 />} />
      )}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <HeaderLayout>
              <DashboardPage />
            </HeaderLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolios"
        element={
          <ProtectedRoute>
            <HeaderLayout>
              <PortfolioPage />
            </HeaderLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolios/:name/:id"
        element={
          <ProtectedRoute>
            <HeaderLayout>
              <PortfolioDetailsPage />
            </HeaderLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stocks"
        element={
          <ProtectedRoute>
            <HeaderLayout>
              <LiveStockDataPage />
            </HeaderLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <HeaderLayout>
              <TransactionHistoryPage />
            </HeaderLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/watchlists"
        element={
          <ProtectedRoute>
            <HeaderLayout>
              <WatchlistPage />
            </HeaderLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stockinfo"
        element={
          <ProtectedRoute>
            <HeaderLayout>
              <StockInfoPage />
            </HeaderLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/esg"
        element={
          <HeaderLayout>
            <ESGPage />
          </HeaderLayout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/chatbot" element={<InvestingTrackerChatbot />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
}

export default App;
