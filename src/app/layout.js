// C:\Sincerus\sincerus-art-website\src\app\layout.js
'use client'; // Mark this component as a Client Component

import './globals.css'; // Import global styles
import Link from 'next/link'; // Import the Link component
import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect hooks

// Metadata is typically defined in Server Components or layout.js without 'use client'
// If you use 'use client', metadata should be defined in a separate file or handled differently.
// For now, let's move metadata definition outside or handle it in page.js files.
// export const metadata = {
//   title: 'Sincerus Art',
//   description: 'Discover unique and heartfelt artwork by [Wife\'s Name].',
// };
// Let's keep metadata definition in individual page.js files or a separate metadata file.

// Root Layout Component
export default function RootLayout({ children }) {
  // State to manage the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to manage the current theme ('light' or 'dark')
  const [theme, setTheme] = useState('light'); // Default theme is light

  // useEffect to read theme preference from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []); // Empty dependency array ensures this runs only once on mount

  // useEffect to update localStorage whenever the theme state changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Apply the theme class to the body element
    document.body.className = theme;
  }, [theme]); // Rerun this effect whenever the 'theme' state changes


  // Function to toggle the mobile menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the mobile menu when a link is clicked (optional, but good UX)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  return (
    <html lang="en">
      {/* Apply the theme class to the html tag as well for potential CSS variables */}
      {/* Or apply it to the body using useEffect as done above */}
      {/* <body className={theme}> */}
      <body>
        {/* Header */}
        <header className="site-header">
          <nav className="site-nav">
            <div className="logo">
              <Link href="/" className="site-title" onClick={closeMenu}>
                Sincerus Art
              </Link>
            </div>

            {/* Hamburger Icon/Button for Mobile */}
            <button
              className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {/* Simple Hamburger Icon using spans */}
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            {/* Navigation Links */}
            {/* Added 'open' class based on state for CSS styling */}
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
              <li>
                <Link href="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" onClick={closeMenu}>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={closeMenu}>
                  Contact
                </Link>
              </li>
              {/* Add more navigation links here as needed */}
            </ul>

            {/* Theme Toggle Button */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {/* You can use an icon here (e.g., sun/moon SVG or emoji) */}
              {theme === 'light' ? '🌙' : '☀️'} {/* Emoji placeholder */}
            </button>

          </nav>
        </header>

        {/* Main content area */}
        <main className="site-main">
          {children} {/* This is where the content of each page (like page.js) will go */}
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} Sincerus Art. All rights reserved.</p>
            {/* Social Media Links Section with Icons */}
            <div className="social-links">
              <p>Connect with Sincerus Art:</p>
              <ul>
                <li>
                  {/* Link for Instagram */}
                  <a href="https://www.instagram.com/sincerus_art?igsh=MThxazBwOHAxaDhidg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    {/* Instagram Icon (Simple SVG) */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-icon instagram-icon"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                </li>
                <li>
                  {/* Link for Facebook */}
                   <a href="https://www.facebook.com/share/1JbHDJsTBN/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    {/* Facebook Icon (Simple SVG) */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="social-icon facebook-icon"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                </li>
                <li>
                  {/* Link for Etsy */}
                   <a href="[Your Etsy URL]" target="_blank" rel="noopener noreferrer" aria-label="Etsy">
                    {/* Etsy Icon (Simple SVG - placeholder style) */}
                     {/* Note: A standard Etsy icon SVG is less common/simple than IG/FB. Using a placeholder style for now. */}
                     {/* You might want to find a specific Etsy icon SVG or use an image later. */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="social-icon etsy-icon">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
