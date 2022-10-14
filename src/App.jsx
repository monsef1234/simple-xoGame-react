import React, { useState } from "react";
import { motion } from "framer-motion";
const animation = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};
const App = () => {
  const Cell = ({ num }) => {
    return <td onClick={() => isClickedHandler(num)}>{arr[num]}</td>;
  };
  const [turn, setTurn] = useState("x");
  const [arr, setArr] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState(false);
  const isClickedHandler = (num) => {
    let cells = [...arr];
    if (cells[num] !== "") {
      alert("is Already Clicked");
      return;
    }
    if (turn === "x") {
      cells[num] = turn;
      setTurn("o");
    } else if (turn === "o") {
      cells[num] = turn;
      setTurn("x");
    }
    // if all cells are full and there is no winner we will show the draw div
    drawCheck(cells);
    winnerCheck(cells);
    setArr(cells);
  };
  const drawCheck = (cells) => {
    const areFull = (check) => {
      return check !== "";
    };
    if (cells.every(areFull)) {
      setDraw(true);
    }
  };
  const winnerCheck = (cells) => {
    let possibilites = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let pos in possibilites) {
      possibilites[pos].forEach((i) => {
        if (cells[i[0]] === cells[i[1]] && cells[i[1]] === cells[i[2]]) {
          // if all cells are full and there is a winner we will show the winner div
          const areFull = (check) => {
            return check !== "";
          };
          if (cells.every(areFull)) {
            setWinner(cells[i[0]]);
            setDraw(false);
          }
          setWinner(cells[i[0]]);
        }
      });
    }
  };
  const repeatHandler = () => {
    setArr(Array(9).fill(""));
    setWinner("");
    setTurn("x");
    setDraw(false);
  };
  return (
    <motion.div className="container">
      <h1>Turn : {turn}</h1>
      <table>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winner && (
        <div>
          <h1 style={{ textTransform: "capitalize" }}>
            {winner} is the winner
          </h1>

          <button onClick={repeatHandler}>Repeat</button>
        </div>
      )}
      {draw && (
        <div>
          <h1>Draw</h1>
          <button onClick={repeatHandler}>Repeat</button>
        </div>
      )}
    </motion.div>
  );
};

export default App;
