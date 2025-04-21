// C:\Sincerus\sincerus-art-website\src\app\gallery\page.js
'use client'; // Mark this as a Client Component because we are using state and effects

import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState hooks
import Image from 'next/image'; // Import the Image component for optimized images

// Metadata for the Gallery page (Note: Metadata exports are not allowed in client components.
// We will handle metadata in layout.js or a separate file if needed.)
// export const metadata = {
//   title: 'Gallery - Sincerus Art',
//   description: 'Explore the art gallery of Surita Bouwer.',
// };


// Gallery Page Component - Now fetches data from Strapi, handles click-to-detail, and fade-in animation
const GalleryPage = () => {
  // State to store the fetched artwork entries from Strapi
  const [artworkEntries, setArtworkEntries] = useState([]);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to manage potential errors
  const [error, setError] = useState(null);
  // --- New State for Selected Artwork ---
  const [selectedArtwork, setSelectedArtwork] = useState(null); // State to hold the artwork object that is currently selected/clicked

  // --- useEffect Hook for Data Fetching ---
  useEffect(() => {
    // Function to fetch data from your local Strapi API
    const getArtwork = async () => {
      setIsLoading(true); // Set loading to true before fetching
      setError(null); // Clear previous errors

      try {
        // Fetch data from your local Strapi API endpoint for 'artworks'
        // Strapi usually creates an endpoint name based on your Collection Type name ('Artwork' -> 'artworks')
        // The 'populate=*' parameter is often needed to include related data like images
        console.log("Attempting to fetch artwork from Strapi..."); // Log before fetch
        const response = await fetch('http://localhost:1337/api/artworks?populate=*');
        console.log("Fetch response received:", response); // Log response object

        if (!response.ok) {
          // Handle HTTP errors (like 403 Forbidden, 404 Not Found, etc.)
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data (raw JSON):", data); // LOG THE RAW DATA STRUCTURE

        // Check if data.data is an array before mapping
        if (!data || !Array.isArray(data.data)) {
             console.error("Strapi response data.data is not an array:", data);
             throw new Error("Invalid data structure received from Strapi.");
        }


        // --- ADJUSTED MAPPING LOGIC (Based on console logs) ---
        // Access fields like title, description, image directly from the item
        // The image URL is nested under item.image.url
        const fetchedArtwork = data.data.map((item, index) => {
             // Log the item structure being processed
            console.log(`Processing item at index ${index}:`, item);

            // Check if the item or its required properties are missing
            // We now expect title, image, etc. directly on the item
            if (!item || !item.title || !item.image || !item.image.url) {
                 console.warn(`Skipping item at index ${index} due to missing required data (title or image URL):`, item);
                 return null; // Skip items that don't have a title or image URL
            }


            return {
                id: item.id, // Use Strapi's item ID
                title: item.title, // Access title directly from item
                description: item.description, // Access description directly
                size: item.size, // Access size directly
                price: item.price, // Access price directly
                yearCreated: item.yearCreated, // Access yearCreated directly
                // Accessing the image URL directly from item.image.url
                imageUrl: item.image.url,
                // Use alternativeText if available, otherwise title or default
                imageAlt: item.image.alternativeText || item.title || 'Artwork image',
                // Image dimensions might also be directly on item.image if populated correctly
                imageWidth: item.image.width,
                imageHeight: item.image.height,
            };
        }).filter(item => item !== null); // Filter out any null items

        console.log("Processed artwork entries:", fetchedArtwork); // Log processed data
        setArtworkEntries(fetchedArtwork); // Update state with fetched and mapped entries

      } catch (err) {
        console.error("Failed to fetch artwork:", err);
        setError(`Failed to load artwork: ${err.message}`); // Set error state with message
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    // Call the data fetching function
    getArtwork();

    // This useEffect is only for data fetching, fade-in JS is in a separate useEffect below

  }, []); // Empty dependency array means this effect runs only once after the initial render


  // --- New useEffect Hook for Fade-in Animation ---
  // This effect runs after the component renders and artworkEntries are updated
  useEffect(() => {
      // Only run this effect if there are artwork entries to display
      if (artworkEntries.length > 0) {
          // Select all elements with the 'fade-in' class within this page
          // Use a small delay to ensure elements are in the DOM after artworkEntries update
          const observerTimeout = setTimeout(() => {
              const elementsToAnimate = document.querySelectorAll('.gallery-item.fade-in'); // Target gallery items with fade-in class

              // Create a new IntersectionObserver instance
              const observer = new IntersectionObserver((entries, observer) => {
                  entries.forEach(entry => {
                      // If the element is intersecting (visible in the viewport)
                      if (entry.isIntersecting) {
                          // Add the 'is-visible' class to trigger the CSS animation
                          entry.target.classList.add('is-visible');
                          // Stop observing the element after it has animated
                          observer.unobserve(entry.target);
                      }
                  });
              }, {
                  // Options for the observer (optional)
                  threshold: 0.1 // Percentage of the target element which should be visible to trigger the callback
              });

              // Loop over the selected elements and start observing each one
              elementsToAnimate.forEach(element => {
                  observer.observe(element);
              });

              // Cleanup function for the observer
              // Disconnect the observer when the component unmounts or dependencies change
              return () => {
                  observer.disconnect();
              };

          }, 100); // Small delay to ensure elements are rendered after state update

          // Cleanup function for the timeout
          return () => clearTimeout(observerTimeout);
      }
      // This effect depends on artworkEntries, so it reruns when artworkEntries changes
  }, [artworkEntries]); // Dependency array includes artworkEntries


  // --- New Function to Handle Artwork Click ---
  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork); // Set the state to the clicked artwork
  };

  // --- New Function to Close Detail View ---
  const handleCloseDetail = () => {
    setSelectedArtwork(null); // Set state back to null to close detail view
  };


  // --- Render Logic ---
  // Display loading message while fetching
  if (isLoading) {
    return (
      <section className="gallery-section">
        <h2>Gallery</h2>
        <p>Loading artwork from Strapi...</p>
      </section>
    );
  }

  // Display error message if fetching failed
  if (error) {
     return (
      <section className="gallery-section">
        <h2>Gallery</h2>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <p>Could not load artwork from Strapi. Please ensure your local Strapi server is running and public permissions are set for Artwork.</p> {/* Added permissions reminder */}
     </section>
    );
  }

  // Display message if no artwork is found after fetching
  if (!artworkEntries || artworkEntries.length === 0) {
    return (
      <section className="gallery-section">
        <h2>Gallery</h2>
        <p>No artwork found in Strapi. Add some entries in the Strapi Content Manager and make sure they are Published!</p> {/* Added Published reminder */}
     </section>
    );
  }

  // Render the gallery if artwork entries were fetched
  return (
    <section className="gallery-section"> {/* Use a class for styling the section */}
      <h2>Gallery</h2>
      {/* Removed "managed by Strapi" text */}
      <p>Browse through a selection of Surita Bouwer's artwork below.</p>

      {/* --- Gallery Grid (Always visible) --- */}
      <div className="gallery-grid"> {/* Use a class for styling the grid */}
        {/* Map over the fetched entries and display each artwork */}
        {artworkEntries.map(item => (
            // Use a class for styling each gallery item
            // Added onClick handler to open detail view
            // Added fade-in class here to the gallery item
            <div
                key={item.id}
                className="gallery-item fade-in" // Added fade-in class
                onClick={() => handleArtworkClick(item)} // Call handler with the item data
                role="button" // Indicate that this div is clickable
                tabIndex={0} // Make it focusable for keyboard navigation
                aria-label={`View details for ${item.title || 'Untitled Artwork'}`} // Accessibility label
            >
              {/* Use Next.js Image component for optimized image rendering */}
              {/* Ensure your Strapi server is running locally for images to load */}
              {/* Prepend Strapi base URL for local images */}
              {/* Note: For deployed site, this URL will need to be the deployed Strapi URL */}
              {item.imageUrl ? (
                 <Image
                   src={`http://localhost:1337${item.imageUrl}`} // Prepend Strapi base URL for local images
                   alt={item.imageAlt} // Use the alt text from Strapi or default
                   className="gallery-image" // Apply your CSS class (will need sizing adjustments in CSS)
                   width={item.imageWidth || 400} // Use actual width if available, otherwise provide a default
                   height={item.imageHeight || 300} // Use actual height if available, otherwise provide a default
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizing
                   priority={false} // Don't prioritize all gallery images
                 />
              ) : (
                 // Placeholder if image URL is missing
                 <div className="gallery-image-placeholder">No Image</div>
              )}

              {/* Display only the title in the grid item */}
              <h3 className="artwork-title">{item.title || 'Untitled'}</h3> {/* Use a class for styling title */}
              {/* Removed description, size, price, year from grid item */}
            </div>
          )
        )}
      </div>

      {/* --- Artwork Detail View (Conditionally rendered) --- */}
      {/* Check if an artwork is selected */}
      {selectedArtwork && (
        // Use a div for the detail view container (will need styling)
        // Added a class for the content container within the modal
        <div className="artwork-detail-view">
            <div className="detail-content-container"> {/* New container for content */}
                {/* Button to close the detail view */}
                <button className="close-detail-button" onClick={handleCloseDetail}>
                  &times; {/* Use a times symbol or an icon */}
                </button>

                {/* Display the full image in the detail view */}
                 {selectedArtwork.imageUrl ? (
                       <Image
                         src={`http://localhost:1337${selectedArtwork.imageUrl}`} // Use the same URL logic
                         alt={selectedArtwork.imageAlt} // Use the alt text
                         className="detail-image" // Use a different class for detail image styling
                         width={selectedArtwork.imageWidth || 800} // Provide larger default width for detail
                         height={selectedArtwork.imageHeight || 600} // Provide larger default height for detail
                         sizes="100vw" // Detail image is likely full width on smaller screens
                         priority={false} // Not above the fold initially
                       />
                    ) : (
                       // Placeholder if image URL is missing
                       <div className="detail-image-placeholder">No Image</div>
                    )}

                {/* Display all the artwork details */}
                {/* Added a wrapper div for text content in detail view */}
                <div className="detail-text-content"> {/* New container for text */}
                    <h3 className="detail-title">{selectedArtwork.title || 'Untitled'}</h3>
                    {selectedArtwork.description && <p className="detail-description">{selectedArtwork.description}</p>}
                    {selectedArtwork.size && <p className="detail-size">Size: {selectedArtwork.size}</p>}
                    {/* Changed currency symbol from $ to ZAR */}
                    {selectedArtwork.price && <p className="detail-price">Price: ZAR {selectedArtwork.price}</p>} {/* Changed $ to ZAR */}
                    {selectedArtwork.yearCreated && <p className="detail-year">Year: {selectedArtwork.yearCreated}</p>}
                    {/* Add more details here as needed */}
                </div>

            </div>
        </div>
      )}


      {/* Add more content or sections for the gallery page if needed */}
    </section>
  );
};

export default GalleryPage;
