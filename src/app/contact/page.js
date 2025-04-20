// C:\Sincerus\sincerus-art-website\src\app\contact\page.js
'use client'; // Mark this component as a Client Component

import React from 'react'; // Import React

// Metadata for the Contact page (Note: Metadata is typically defined in Server Components or layout.js without 'use client')
// If you use 'use client', metadata should be defined in a separate file or handled differently.
// export const metadata = {
//   title: 'Contact - Sincerus Art',
//   description: 'Get in touch for commission inquiries or other questions.',
// };
// Let's keep metadata definition in individual page.js files or a separate metadata file.

// Contact Page Component
const ContactPage = () => {
  // In a real application, you would handle form submission here
  // using state, event handlers, and potentially API routes in Next.js
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic (e.g., send email)
    console.log('Form submitted!');
    // You would typically collect form data here and send it
  };

  return (
    <section className="contact-section">
      <h2>Contact</h2>
      <p>Please use the form below to inquire about commissions or other questions.</p>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="6" required></textarea>
        </div>

        <button type="submit" className="submit-button">Send Message</button>
      </form>

      {/* Add more contact information like email address or phone number if desired */}
    </section>
  );
};

export default ContactPage;
