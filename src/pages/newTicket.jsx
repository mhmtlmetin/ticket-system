import React, { useState } from "react";
import { useCreateTicketMutation } from "../services/tickets.service";
import '../styles/NewTicket.scss'

export default function NewTicket() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "open",
  });

  const [createTicket, { isLoading, error, isSuccess }] = useCreateTicketMutation();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTicket({
        ...formData,
        createdBy: 1, // kullanıcı ID örneği
        createdAt: new Date().toISOString(),
      }).unwrap();

      // Başarılı ise formu temizle
      setFormData({
        title: "",
        description: "",
        category: "",
        status: "open",
      });
    } catch (err) {
      console.error("Error creating ticket:", err);
    }
  };

  return (
    <div className="new-ticket-page">
      <h2 className="form-title">Create New Ticket</h2>

      {isSuccess && <p className="success-message">Ticket created successfully!</p>}
      {error && <p className="error-message">Failed to create ticket.</p>}

      <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Network">Network</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? "Submitting..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
}
