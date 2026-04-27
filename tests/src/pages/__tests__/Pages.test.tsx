import { render, screen } from '@testing-library/react';
import React from 'react';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import EventDetail from '../../pages/EventDetail';
import OrgDashboard from '../../pages/OrgDashboard';

describe('page smoke tests', () => {
  it('renders Home page text', () => {
    render(<Home />);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders Login page text', () => {
    render(<Login />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders EventDetail page text', () => {
    render(<EventDetail />);
    expect(screen.getByText('Event Detail Page')).toBeInTheDocument();
  });

  it('renders OrgDashboard page text', () => {
    render(<OrgDashboard />);
    expect(screen.getByText('Org Dashboard Page')).toBeInTheDocument();
  });
});
