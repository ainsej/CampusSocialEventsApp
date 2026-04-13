import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import OrgDashboard from './pages/OrgDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<OrgDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
