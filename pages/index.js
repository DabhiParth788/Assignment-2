import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import GameCard from "../components/GameCard";
import Dropdown from "../components/Dropdown";

const Home = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [sortOrder, setSortOrder] = useState("");

  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);

  const sortOptions = ["Sort by Score (Low to High)", "Sort by Score (High to Low)"];

  // Fetch game data from API
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setFilteredGames(data);

        // Extract unique genres and platforms
        const uniqueGenres = [
          "All Genres",
          ...new Set(
            data.flatMap((game) =>
              (game.genre || "Undefined").split(",").map((g) => g.trim())
            )
          ),
        ];

        const uniquePlatforms = [
          "All Platforms",
          ...new Set(data.map((game) => game.platform || "Undefined")),
        ];

        setGenres(uniqueGenres);
        setPlatforms(uniquePlatforms);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Combined filtering logic
  useEffect(() => {
    let filtered = games;

    // Filter by genre
    if (selectedGenre !== "All Genres") {
      filtered = filtered.filter((game) =>
        (game.genre || "Undefined")
          .split(",")
          .map((g) => g.trim())
          .includes(selectedGenre)
      );
    }

    // Filter by platform
    if (selectedPlatform !== "All Platforms") {
      filtered = filtered.filter((game) => game.platform === selectedPlatform);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((game) =>
        (game.title || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }


    // Apply sorting
    if (sortOrder === "Sort by Score (Low to High)") {
      filtered = [...filtered].sort((a, b) => a.score - b.score);
    } else if (sortOrder === "Sort by Score (High to Low)") {
      filtered = [...filtered].sort((a, b) => b.score - a.score);
    }


    setFilteredGames(filtered);
  }, [games, selectedGenre, selectedPlatform, searchQuery, sortOrder]);

  return (
    <div className="flex flex-col">

      <SearchBar onSearch={setSearchQuery} />

      <div className="flex flex-1">

        <Sidebar genres={genres} onFilter={setSelectedGenre} />

        <div className="w-5/6 ml-64 right-0 overflow-y-scroll bg-white px-4">
                <div className="fixed w-5/6 right-0 bg-white z-20 px-4 h-28">
                    <div className="flex justify-between">
                      <Dropdown options={platforms} onSelect={setSelectedPlatform} label="Filter by Platform" />
                      <Dropdown options={sortOptions} onSelect={setSortOrder} label="Sort by Score" />
                    </div>
                </div>


        <div className="grid grid-cols-3 gap-4 p-4 pt-28">
          {filteredGames.length > 0 ? (
            filteredGames.map((game, index) => <GameCard key={index} game={game} />)
          ) : (
            <div className="col-span-3 text-center text-gray-500">No games available for the selected filters.</div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
