// Header.js

import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <Link to="/"><h1>Suka Film</h1></Link>
  </header>
)

export default Header;