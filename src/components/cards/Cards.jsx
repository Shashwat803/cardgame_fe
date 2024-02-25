/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import "./Card.css";
import Card from "../Card/Card";
import { defuseBomb, explodingBomb,  removeCard, setCardValue,  setCardVisible,  startGame, updateCurrentScore } from "../../features/card/cardSlice";

const Cards = () => {
  const value = useSelector((state)=> state.value)
  const showBoard = useSelector((state)=> state.showBoard)
  const cards = useSelector((state)=> state.cards)
  const dispatch = useDispatch()

  useEffect(() => {
    if (value?.cardName === "cat") {
      dispatch(removeCard(value))
    }

    if (value?.cardName === "shuffle") {
      dispatch(startGame())
    }

    if (value?.cardName === "exploding_kitten_bomb") {
      if (value?.isDefused) {
        dispatch(explodingBomb(value))
      } else {
        alert("BOMBA EXPLOTOU! Game Restarting!");
        dispatch(updateCurrentScore(0))
        dispatch(startGame())
      }
    }
    if (value?.cardName === "defuse") {
      dispatch(defuseBomb(value))
    }
  }, [value]);

  const handleValueChange = (card) => {
    dispatch(setCardVisible(card))
    setTimeout(() => {
      dispatch(setCardValue(card))
    }, 1000);
  };

  return (
    <div className="container">
      <div className="cards">
        {showBoard &&
          cards.length > 0 ? (
            cards.map((card, i) => (
              <Card
                card={card}
                key={i}
                onClick={() => handleValueChange(card)}
              />
            ))
          ):(<h2 className="start-game">Start Game</h2>)
         }
      </div>
    </div>
  );
};

export default Cards;
