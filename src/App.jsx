import React from "react";
import { Router, Route, Routes, useLocation } from "react-router-dom";
import LanguageSwitcher from "./components/languageSwitcher";
import Login from "./pages/login";
import AdminDashboard from "./pages/adminDashboard";
import UserDashboard from "./pages/userDashboard";
import NewTicket from "./pages/newTicket";
import TicketDetail from "./pages/ticketDetail";
import Profile from "./pages/profile";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protectedRoute";

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // login'de navbar gizle

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div style={{ marginTop: !hideNavbar ? "70px" : "0" }}>{children}</div>
    </>
  );
}

function App() {
  return (
    <>
      <LanguageSwitcher></LanguageSwitcher>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-ticket"
            element={
              <ProtectedRoute>
                <NewTicket />
              </ProtectedRoute>
            }
          />
          <Route path="/requests/:id" element={
            <ProtectedRoute>
              <TicketDetail />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
