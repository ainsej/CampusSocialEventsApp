import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        <Link to="/">Events</Link>
        {user && user.role === 'orgAdmin' && (
          <Link to="/dashboard">Dashboard</Link>
        )}
      </div>
      <div className="navbar-auth">
        {user ? (
          <>
            <span className="navbar-user">{user.name}</span>
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
