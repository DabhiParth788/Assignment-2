const GameCard = ({ game }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4">
      <h3 className="text-xl font-bold">{game.title}</h3>
      <p>Platform: {game.platform}</p>
      <p>Score: {game.score}</p>
      <p>Genre: {game.genre}</p>
      <p>
        Editor's Choice:{" "}
        <span className={game.editors_choice === "Y" ? "text-green-500" : "text-red-500"}>
          {game.editors_choice === "Y" ? "Yes" : "No"}
        </span>
      </p>
    </div>
  );
};

export default GameCard;
