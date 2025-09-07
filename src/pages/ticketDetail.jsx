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
      <div className="ticket-detail">
        <h2>{ticket?.title}</h2>
        <p>
          <strong>Description:</strong> {ticket?.description}
        </p>
        <p>
          <strong>Category:</strong> {ticket?.category}
        </p>
        <p>
          <strong>Status:</strong> {ticket?.status}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(ticket?.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Created By:</strong> User #{ticket?.createdBy}
        </p>
      </div>
       {authorId === "1" && (
        <div className="status-update">
          <h3>Status Güncelle</h3>
          <select 
            value={newStatus} 
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <button onClick={handleStatusChange}>Kaydet</button>
        </div>
      )}
      <div className="ticket-comments">
        <h3>Comments</h3>
        {comments?.length === 0 && <p>No comments yet.</p>}

        <ul>
          {comments?.map((c) => (
            <li key={c.id}>
              <p>
                <strong>{getUserName(c.authorId)}:</strong> {c.text}
              </p>
              <small>{new Date(c.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default TicketDetail;
