import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'

export const NavBar = () => {
  return (
    <div class="navbar">
      <Link href="/home" class="active">
        Home
      </Link>
      <a href="#">About</a>
      <a href="#">Contanct</a>
      <a href="#" class="right">
        Login
      </a>
    </div>
  );
};

export default NavBar;
