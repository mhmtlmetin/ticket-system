import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useGetUserByAuthorIdQuery} from "../services/tickets.service"
import "../styles/navbar.scss";

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
const authorId = localStorage.getItem("userName");
const navigate = useNavigate();
  const { data: users } = useGetUserByAuthorIdQuery(authorId);
  const userName= users?.filter(u => u.id == authorId).map(i=>  i.name);

 const handleLogout = () => {
    localStorage.removeItem("userName"); 
    navigate("/");              
  };
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        Ticket System
      </div>
      <div className="navbar__profile">
        <button
          className="navbar__profile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {userName|| "User"}
          <span className="navbar__arrow">{menuOpen ? "▲" : "▼"}</span>
        </button>
        {menuOpen && (
          <div className="navbar__dropdown">
            <p><button onClick={()=>navigate("/profile")}>{"Profil"}</button></p>
            
            <hr />
            <button onClick={handleLogout} className="navbar__logout">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;