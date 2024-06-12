import { useState } from "react";

// Função para verificar o vencedor ou empate
function checkWinner(grid, player) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Linhas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Colunas
    [0, 4, 8],
    [2, 4, 6], // Diagonais
  ];

  const win = winPatterns.some((pattern) =>
    pattern.every((index) => grid[index] === player),
  );

  const draw = grid.every((square) => square !== "");

  if (win) return "winner";
  if (draw) return "draw";
  return null;
}

function App() {
  const [player, setPlayer] = useState("x");
  const [grid, setGrid] = useState(Array(9).fill(""));
  const [message, setMessage] = useState("");
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [eventActive, setEventActive] = useState(true);

  // Função para tratar o clique nos quadrados
  function handleClick(i) {
    if (!eventActive || grid[i] !== "") return;

    const newGrid = [...grid];
    newGrid[i] = player;
    setGrid(newGrid);

    const result = checkWinner(newGrid, player);
    if (result === "winner") {
      updateScore(player);
      endGame(`${player} is the winner!`);
    } else if (result === "draw") {
      endGame("It's a draw!");
    } else {
      setPlayer(player === "x" ? "o" : "x");
    }
  }

  // Função para finalizar o jogo
  function endGame(message) {
    setMessage(message);
    setEventActive(false);
  }

  // Função para reiniciar o jogo
  function restart() {
    setGrid(Array(9).fill(""));
    setPlayer("x");
    setMessage("");
    setEventActive(true);
  }

  // Função para atualizar a pontuação
  function updateScore(player) {
    if (player === "x") {
      setXScore(xScore + 1);
    } else {
      setOScore(oScore + 1);
    }
  }

  return (
    <>
      <div
        id="score-board"
        className="flex justify-center items-center gap-x-8 py-3 px-4"
      >
        <img src="./x.png" className="w-8" alt="x" />
        <span
          id="score"
          className="text-teal-600 text-3xl sm:text-4xl border-2 border-teal-600 rounded-2xl px-4 py-4"
        >
          {xScore} x {oScore}
        </span>
        <img src="./o.png" alt="o" className="w-8" />
      </div>
      <span id="message" className="text-amber-500">
        {message}
      </span>
      <main className="grid grid-cols-3 grid-rows-3 w-72 h-72 sm:w-96 sm:h-96 box-border">
        {grid.map((box, index) => (
          <div
            className="flex justify-center items-center border-[1px] border-[#fbf1c7] cursor-pointer box-border"
            key={index}
            onClick={() => handleClick(index)}
          >
            {box && <img src={`./${box}.png`} alt={box} className="h-16" />}
          </div>
        ))}
      </main>
      <button
        onClick={restart}
        className="font-fira-code p-4 bg-transparent cursor-pointer rounded-2xl border-2 border-amber-500 text-amber-500 text-lg transition-all hover:text-xl"
      >
        Reiniciar
      </button>
    </>
  );
}

export default App;
