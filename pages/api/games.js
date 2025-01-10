export default async function handler(req, res) {
  const response = await fetch(
    "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
  );

  if (response.ok) {
    const data = await response.json();

    // Filter out invalid entries (e.g., metadata like api_rate_limit)
    const games = data.filter(
      (entry) =>
        entry.title !== undefined // Ensure valid game data
    );

    // Assign a default genre ("Undefined") for games with missing or empty genres
    const normalizedGames = games.map((game) => ({
      ...game,
      genre: game.genre && game.genre.trim() !== "" ? game.genre : "Undefined", // Handle empty/missing genre
    }));

    res.status(200).json(normalizedGames);
  } else {
    res.status(500).json({ message: "Failed to fetch data" });
  }
}
