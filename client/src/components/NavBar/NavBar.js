import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login/Login";
import "./NavBar.css";

export const NavBar = () => {
  useEffect(() => {
    const modal = document.querySelector(".loginForm");
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }, []);

  const openLogin = () => {
    document.querySelector('.loginForm').style.display='block'
  }

  return (
    <div className="navbar">
      <Link to="/home" className="active">
        Home
      </Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contanct</Link>
      <div className="right btnLogin" onClick={()=>{openLogin()}}>
        Login
        <Login/>
      </div>
    </div>
  );
};

export default NavBar;
