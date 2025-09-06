import React from "react";
import { Router, Route, Routes} from "react-router-dom";
import LanguageSwitcher from "./components/languageSwitcher";
import Login from "./pages/login";
import AdminDashboard from "./pages/adminDashboard";
import UserDashboard from "./pages/userDashboard";
import NewTicket from "./pages/newTicket";

function App() {
  return (
    <>
    <LanguageSwitcher></LanguageSwitcher>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/new-ticket" element={<NewTicket />} />
      </Routes>
      </>
  );
}

export default App;
