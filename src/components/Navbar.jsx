import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="logo">Community Library</div>

        <nav>
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>

        <div className="user-area">
          <span>{user.name}</span>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;