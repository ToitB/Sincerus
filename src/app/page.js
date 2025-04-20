// C:\Sincerus\sincerus-art-website\src\app\page.js

// Note: This is a Server Component by default in App Router.
// If you need client-side interactivity (like state or effects),
// you would add 'use client' at the top.
// For now, basic content can be server-rendered.

import Link from 'next/link'; // Import Link for navigation
import React from 'react'; // Import React

// Root Page Component (Home Page)
const HomePage = () => {
  return (
    <div className="home-page-content"> {/* Added wrapper div back for consistency */}
      {/* Hero Section */}
      <section className="hero-section"> {/* Added class */}

        {/* Logo Banner Section - New Structure */}
        <div className="logo-banner"> {/* New div for the full-width logo banner */}
           <div className="company-logo"> {/* Logo container */}
             {/* Your SVG Logo */}
             {/* Assuming your logo file is named logo.svg and saved in the public folder */}
             <img src="/logo.svg" alt="Sincerus Art Logo" className="home-page-logo"/> {/* Added img and class */}
           </div>
        </div>


        <div className="hero-content"> {/* Existing wrapper div for text content */}
          {/* Text content (Name, Tagline, Button) */}
          {/* These elements will now be visually below the logo banner */}
          <h1>Welcome to Sincerus Art</h1>
          <p className="tagline">Discover unique and heartfelt artwork by [Wife's Name].</p>

          {/* Call to Action Button */}
          {/* Assuming you want a CTA button here */}
          <Link href="/gallery" className="cta-button">
             Explore the Gallery
          </Link>

          {/* We will add more content and styling here later */}
        </div>
        {/* This content will be rendered inside the <main> tag in layout.js */}
      </section>

      {/* Placeholder for other sections like About, Featured, Contact */}
      {/* Example About Section (can be uncommented later) */}
      {/*
      <section className="about-section">
        <h2>About the Artist</h2>
        <p>
          [Insert a brief, compelling paragraph here introducing the artist,
          their style, inspiration, and passion for creating art.]
        </p>
      </section>
      */}

    </div>
  );
};

export default HomePage;
