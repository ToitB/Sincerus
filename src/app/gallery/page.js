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


// Gallery Page Component - Now fetches data from Strapi
const GalleryPage = () => {
  // State to store the fetched artwork entries from Strapi
  const [artworkEntries, setArtworkEntries] = useState([]);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to manage potential errors
  const [error, setError] = useState(null);

  // useEffect hook to fetch data from Strapi when the component mounts
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


        // --- ADJUSTED MAPPING LOGIC ---
        // Based on console log, fields like title, description, image are directly on the item
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

    // Note: We are not including the fade-in animation logic in this file yet,
    // as the focus is on data fetching. We can add it back later if needed,
    // potentially in a separate component or by adapting the useEffect.

  }, []); // Empty dependency array means this effect runs only once after the initial render


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
      <p>Browse through a selection of Surita Bouwer's artwork below.</p> {/* Updated text */}

      {/* Gallery Grid */}
      <div className="gallery-grid"> {/* Use a class for styling the grid */}
        {/* Map over the fetched entries and display each artwork */}
        {artworkEntries.map(item => (
            // Use a class for styling each gallery item
            // You can add fade-in class here later if you re-implement animation
            <div key={item.id} className="gallery-item">
              {/* Use Next.js Image component for optimized image rendering */}
              {/* Ensure your Strapi server is running locally for images to load */}
              {/* Prepend Strapi base URL for local images */}
              {/* Note: For deployed site, this URL will need to be the deployed Strapi URL */}
              {item.imageUrl ? (
                 <Image
                   src={`http://localhost:1337${item.imageUrl}`} // Prepend Strapi base URL for local images
                   alt={item.imageAlt} // Use the alt text from Strapi or default
                   className="gallery-image" // Apply your CSS class
                   width={item.imageWidth || 400} // Use actual width if available, otherwise provide a default
                   height={item.imageHeight || 300} // Use actual height if available, otherwise provide a default
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizing
                   priority={false} // Don't prioritize all gallery images
                 />
              ) : (
                 // Placeholder if image URL is missing
                 <div className="gallery-image-placeholder">No Image</div>
              )}

              <h3 className="artwork-title">{item.title || 'Untitled'}</h3> {/* Use title or default */}
              {/* Display other fields from Strapi */}
              {item.size && <p>{item.size}</p>}
              {item.price && <p>${item.price}</p>} {/* Example formatting for price */}
              {item.yearCreated && <p>Year: {item.yearCreated}</p>}
              {/* Description can be added here if you want to display it in the grid */}
              {/* {item.description && <p>{item.description}</p>} */}
            </div>
          )
        )}
      </div>

      {/* Add more content or sections for the gallery page if needed */}
    </section>
  );
};

export default GalleryPage;
