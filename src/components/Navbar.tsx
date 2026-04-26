import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">Campus Events</Link>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}
        >
          Events
        </NavLink>
        {user && user.role === 'orgAdmin' && (
          <NavLink to="/dashboard" className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}>
            Dashboard
          </NavLink>
        )}
      </div>
      <div className="navbar-auth">
        {user ? (
          <>
            <span className="navbar-user">{user.name}</span>
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => `nav-tab${isActive ? ' active' : ''}`}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
