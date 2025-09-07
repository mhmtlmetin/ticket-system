import React from "react";
import { useState, useEffect } from "react";
import { data, useParams } from "react-router-dom";
import {
  useGetTicketQuery,
  useGetCommentsByRequestIdQuery,
  useAddCommentMutation,
  useGetUserByAuthorIdQuery,
  useUpdateTicketMutation 
} from "../services/tickets.service";
import '../styles/ticketDetail.scss'

function TicketDetail() {
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
      alert("Ticket status güncellendi ✅");
    } catch (err) {
      console.error("Status update error:", err);
      alert("Güncelleme sırasında hata oluştu");
    }
  };

  return (
    <div className="ticket-container">
  {/* Ticket Info */}
  <div className="ticket-detail">
    <h2>{ticket?.title}</h2>
    <p><strong>Description:</strong> {ticket?.description}</p>
    <p><strong>Category:</strong> {ticket?.category}</p>
    <p><strong>Status:</strong> {ticket?.status}</p>
    <p><strong>Created At:</strong> {new Date(ticket?.createdAt).toLocaleString()}</p>
    <p><strong>Created By:</strong> User #{ticket?.createdBy}</p>
  </div>

  {/* Status Update Panel */}
  {authorId === "1" && (
    <div className="status-update">
      <h3>Status Update</h3>
      <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <button onClick={handleStatusChange}>Save</button>
    </div>
  )}

  {/* Comments */}
  <div className="ticket-comments">
    <h3>Comments</h3>
    <ul>
      {comments?.length === 0 && <p>No comments yet.</p>}
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
        placeholder="Write a comment..."
      />
      <button type="submit">Add Comment</button>
    </form>
  </div>
</div>

  );
}

export default TicketDetail;
