import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Fuzzy Meme</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}

export default Navbar;

