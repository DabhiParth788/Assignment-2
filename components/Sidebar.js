import { useState } from 'react';

function Sidebar({ genres, onFilter }) {
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Handle genre click
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre); // Set the selected genre
    onFilter(genre); // Pass the selected genre to the parent component for filtering
  };

  return (
    <div className="bg-gray-200 p-4 w-1/6 h-full fixed">
      <h2 className="text-lg font-bold mb-4">Genres</h2>
      <ul>
        {genres.map((genre, index) => (
          <li
            key={index}
            className={`cursor-pointer mb-2 px-2 py-1 rounded-md text-sm 
              ${selectedGenre === genre
                ? 'bg-blue-500 text-white'  // Highlight the selected genre
                : 'bg-transparent text-black'}
              hover:bg-blue-300 hover:text-white transition duration-200`}
            onClick={() => handleGenreClick(genre)} // Set the selected genre on click
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
