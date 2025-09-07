import React from "react";
import { useState, useEffect } from "react";
import { data, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useGetTicketQuery,
  useGetCommentsByRequestIdQuery,
  useAddCommentMutation,
  useGetUserByAuthorIdQuery,
  useUpdateTicketMutation,
} from "../services/tickets.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ticketDetail.scss";

function TicketDetail() {
  const { t } = useTranslation();
  const authorId = localStorage.getItem("userName");
  const { id } = useParams();
  const [text, setText] = useState("");
  const { data: ticket, isLoading, error } = useGetTicketQuery(id);
  const [newStatus, setNewStatus] = useState(ticket?.status || "");
  const { data: comments } = useGetCommentsByRequestIdQuery(id);
  const { data: users } = useGetUserByAuthorIdQuery(authorId);
  console.log(users, "username");
  const [addComment] = useAddCommentMutation();
  const [updateTicket] = useUpdateTicketMutation();

  console.log(data, "data");
  const getUserName = (id) => {
    const user = users?.find((u) => String(u.id) === String(id));
    return user ? user.name : `User #${id}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addComment({
      requestId: Number(id),
      authorId: Number(authorId),
      text,
      createdAt: new Date().toISOString(),
    });

    setText("");
  };
  const handleStatusChange = async () => {
    try {
      await updateTicket({ id: ticket.id, status: newStatus }).unwrap();
      toast.success("İşlem başarılı!");
    } catch (err) {
      toast.error("Bir hata oluştu!");
    }
  };

  return (
    <div className="ticket-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="ticket-detail">
        <h2>{ticket?.title}</h2>
        <p>
          <strong>{t("description")}:</strong> {ticket?.description}
        </p>
        <p>
          <strong>{t("category")}:</strong> {ticket?.category}
        </p>
        <p>
          <strong>{t("status")}:</strong> {ticket?.status}
        </p>
        <p>
          <strong>{t("createdAt")}:</strong>{" "}
          {new Date(ticket?.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>{t("createdBy")}:</strong> User #{ticket?.createdBy}
        </p>
      </div>

      {authorId === "1" && (
        <div className="status-update">
          <h3>{t("statusUpdate")} </h3>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <button onClick={handleStatusChange}>{t("save")} </button>
        </div>
      )}

      <div className="ticket-comments">
        <h3>{t("comments")}</h3>
        <ul>
          {comments?.length === 0 && <p>Henüz yorum yok.</p>}
          {comments?.map((c) => (
            <li key={c.id}>
              <span className="username">{getUserName(c.authorId)}</span>
              <p className="comment-text">{c.text}</p>
              <small className="comment-date">
                {new Date(c.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("writeComment")}
          />
          <button type="submit">{t("addComment")}</button>
        </form>
      </div>
    </div>
  );
}

export default TicketDetail;
