
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { users } from '../data/mockData.ts';
import type { User } from '../types/User';


const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Find the full user object if logged in
  const userObj: User | undefined = user ? users.find((u: User) => u.email === user || u.name === user) : undefined;

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
        {userObj && userObj.role === 'orgAdmin' && (
          <Link to="/dashboard">Dashboard</Link>
        )}
      </div>
      <div className="navbar-auth">
        {userObj ? (
          <>
            <span className="navbar-user">{userObj.name}</span>
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
