const SearchBar = ({ onSearch }) => {
    return (
      <div className="bg-blue-600 p-4 h-24 text-white flex justify-between items-center sticky top-0 z-10 w-full">
        <h1 className="text-2xl font-bold w-2/12 mr-10">Game Listing</h1>
        <input
          type="text"
          placeholder="Search games..."
          className="p-2 rounded-md text-black w-10/12"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    );
  };
  
  export default SearchBar;
  