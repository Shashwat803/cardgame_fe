import React from "react";

const Card = ({ card, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
    { card?.isVisible && <div className="card-name">{card?.cardName}</div>}
    </div>
  );
};

export default Card;
