import React from "react";
import "../styles/ticketCard.scss";

const TicketCard = ({ request }) => {
  const { title, description, category, status, createdAt } = request;

  return (
    <div className={`request-card ${status}`}>
      <div className="card-header">
        <h3>{title}</h3>
        <span className={`status ${status}`}>{status}</span>
      </div>
      <p className="description">{description}</p>
      <div className="card-footer">
        <span className="category">{category}</span>
        <span className="date">{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default TicketCard;
