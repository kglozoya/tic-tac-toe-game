import React, { useEffect, useState } from "react";
import ScoreBoard from "./ScoreBoard";
import "./TicTacToe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faO } from "@fortawesome/free-solid-svg-icons";

export default function TicTacToe() {
  const [turn, setTurn] = useState("X");
  {
    /* the prop 'scores' is an array of objects 
    scores: [{playerName:string, scores:number}] */
  }
  const [scores, setScores] = useState([
    { playerName: "X", score: 0 },
    { playerName: "O", score: 0 },
  ]);

  function changeTurns() {
    if (turn == "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
  }

  return (
    <div>
      {/* score display - either..*/}
      <ScoreBoard scores={scores} gameName="Tic Tac Toe" />
      <div>{turn}'s turn</div>
      {/* game board - complex gets its own component*/}
      <GameBoard
        turn={turn}
        setTurn={setTurn}
        changeTurns={changeTurns}
        setScores={setScores}
        scores={scores}
      />
      {/* reset button - either.. */}
    </div>
  );
}

function GameBoard({ turn, setTurn, changeTurns, setScores, scores }) {
  const [theBoard, setTheBoard] = useState(Array(9).fill(""));
  //theBoard is an array

  const [isGameOver, setIsGameOver] = useState(false);
  // concept of a flag

  function handleCellClicked(index) {
    if (theBoard[index] == "" && !isGameOver) {
      setTheBoard(
        theBoard.map((c, i) => {
          if (i == index) {
            return turn;
          } else {
            return c;
          }
        })
      );
      changeTurns();
    }
  }

  function checkForWinner() {
    let winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    /// if theBoard === [ winning combo] the => winner
    ///  if not, keeping playing
    // if (theBoard[0] !== "" && theBoard[0] == theBoard[1]  && theBoard[0] == theBoard[2]) {

    for (let combo of winningCombos) {
      let [a, b, c] = combo;
      if (
        theBoard[a] !== "" &&
        theBoard[a] == theBoard[b] &&
        theBoard[a] == theBoard[c]
      ) {
        console.log("winner", theBoard[a]);
        return theBoard[a];
      }
    }
    return "";
  }

  function onResetClicked(){
      // clear the board
      setTheBoard(Array(9).fill(""));
      // unfreeze the game- 
      setIsGameOver(false);
      // reset to x turn
      setTurn('X');
  }

  useEffect(() => {
    let winner = checkForWinner();
    if (winner !== "") {
      setScores(
        scores.map((s) => {
            console.log(s.playerName, winner)
          if (s.playerName == winner) {
            return {
              ...s,
              score: s.score + 1,
            };
          } else {
            return s;
          }
        })
      );
      setIsGameOver(true);
    }
  }, [theBoard]);

  return (
    <>
      <div className="gameboard-root">
        {theBoard.map((cell, i) => (
          <div
            onClick={() => {
              handleCellClicked(i);
            }}
          >
            {cell && (
              <FontAwesomeIcon size="4x" icon={cell == "X" ? faXmark : faO} />
            )}
          </div>
        ))}
      </div>
      <button onClick={onResetClicked}>Reset</button>
    </>
  );
}
