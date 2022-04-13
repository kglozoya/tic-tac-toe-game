import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faO } from "@fortawesome/free-solid-svg-icons";
import "./scoreboard.css";

export default function ScoreBoard({ gameName, scores }) {
  {
    /* the prop 'scores' is an array of objects 
scores: [{playerName:string, scores:number}] */
  }

  return (
    <div className="score-board-root">
      <div className="title">{gameName}</div>
      <h3>Scores:</h3>
          {scores.map((score) => (
            <div className="scores">
              {score.playerName} -- {score.score}{" "}
            </div>
          ))}
    </div>
  );
}
