import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './routes/home/home';

// describe('HomePage', () => {
//   test('renders heading', () => {
//     render(<Home />);
//     const headingElement = screen.getByRole('heading', { name: 'Welcome to My Website' });
//     expect(headingElement).toBeInTheDocument();
//   });

//   test('renders navigation links', () => {
//     render(<Home />);
//     const homeLink = screen.getByRole('link', { name: 'Home' });
//     expect(homeLink).toBeInTheDocument();
//     const aboutLink = screen.getByRole('link', { name: 'Notifications' });
//     expect(aboutLink).toBeInTheDocument();
//     const contactLink = screen.getByRole('link', { name: 'Profile' });
//     expect(contactLink).toBeInTheDocument();
//   });
// });


test('renders the correct heading', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { name: 'Welcome to My Website' });
    expect(heading).toBeInTheDocument();
    // Log the rendered output to check the role and name
    debug();
  });
  