import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../styles/ticketCard.scss";

const TicketCard = ({ request }) => {
  const { id, title, description, category, status, createdAt } = request;
  const { t } = useTranslation();
 const navigate = useNavigate();
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
        <button
          className="ticket-detail"
          onClick={() => navigate(`/requests/${request.id}`)}
        >
          {t("detail")}
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
