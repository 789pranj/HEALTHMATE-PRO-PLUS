import React, { useEffect } from "react";
import FloatingShape from "./components/FloatingShape";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import Login from "./pages/Login";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RegisterDoctor from "./pages/RegisterDoctor";
import VerifyDoctorEmail from "./pages/VerifyDoctorEmail";
import Chat from "./pages/Chat";
import ChatAi from "./pages/ChatAi";
import AllDoctor from "./pages/AllDoctor";
import BMICalculator from "./pages/BMICalculator ";
import GeneralHealthTips from "./pages/GeneralHealthTips";
import ErrorPage from "./pages/ErrorPage";
import FirstAid from "./pages/FirstAid";
import Diet from "./pages/Diet";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br 
    from-[#E3F2FD] via-[#A5D6A7] to-[#4CAF50] flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-yellow-600"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-700"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-800"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />

        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/register-doctor"
          element={
            <ProtectedRoute>
              <RegisterDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-doctor"
          element={
            <ProtectedRoute>
              <VerifyDoctorEmail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat-ai"
          element={
            <ProtectedRoute>
              <ChatAi />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-doctors"
          element={
            <ProtectedRoute>
              <AllDoctor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bmi-calculator"
          element={
            <ProtectedRoute>
              <BMICalculator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/general-health-tips"
          element={
            <ProtectedRoute>
              <GeneralHealthTips />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-first-aid"
          element={
            <ProtectedRoute>
              <FirstAid />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Diet"
          element={
            <ProtectedRoute>
              <Diet />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
