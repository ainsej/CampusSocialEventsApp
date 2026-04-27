import { render, screen } from '@testing-library/react';
import React from 'react';
import Navbar from '../../components/Navbar';
import EventCard from '../../components/EventCard';

describe('static components', () => {
  it('renders Navbar placeholder text', () => {
    render(<Navbar />);
    expect(screen.getByText('Navbar')).toBeInTheDocument();
  });

  it('renders EventCard placeholder text', () => {
    render(<EventCard />);
    expect(screen.getByText('Event Card')).toBeInTheDocument();
  });
});
