/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "./GameBoard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  startGame,
  updateCurrentScore,
  updateHighScore,
  updateUsername,
} from "../features/card/cardSlice.js";
import Cards from "../components/cards/Cards.jsx";
import { postScore, registerUser } from "../common/API.js";
import { Link } from "react-router-dom";
const GameBoard = () => {
  const username = useSelector((state) => state.username);
  const cards = useSelector((state) => state.cards);
  const currentScore = useSelector((state) => state.currentScore);
  const highScore = useSelector((state) => state.highScore);
  const dispatch = useDispatch();

  const handleRegisterUser = async (username) => {
    try {
      const response = await registerUser(username)
      dispatch(updateUsername(response.data.data.username));
    } catch (error) {
      console.log(error);
    }
  };

  const handleScore = async (username, highScore) => {
     await postScore(username, highScore)
  }

  const handleStartGame = () => {
    if (username.length !== 0) {
      dispatch(startGame());
    } else {
      const name = prompt("Enter your username");
      handleRegisterUser(name).then(() => {
        dispatch(startGame());
      });
    }
  };

  useEffect(() => {
    if (cards.length === 0 && username.length !== 0) {
      dispatch(updateCurrentScore(currentScore + 1));
      dispatch(updateHighScore(Math.max(currentScore + 1, highScore)));
      handleScore(username, currentScore);
    }
  }, [cards]);

  return (
    <div className="board-container">
      <div className="board">
        <div className="score">
        <div className="leaderboard-btn"><Link to="/leaderboard">Leaderboard</Link></div>
          <h2>username - {username}</h2>
          <h2>Current Score - {currentScore}</h2>
          <h2> Highest Score - {highScore}</h2>
        </div>
        <Cards />
        <div className="button-container">
          <button onClick={() => dispatch(handleStartGame)}>Start</button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
