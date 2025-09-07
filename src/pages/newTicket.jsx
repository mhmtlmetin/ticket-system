import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCreateTicketMutation } from "../services/tickets.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/NewTicket.scss";

export default function NewTicket() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "open",
  });

  const [createTicket, { isLoading, error, isSuccess }] =
    useCreateTicketMutation();
  const navigate = useNavigate();

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
      toast.success("İşlem başarılı!");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (err) {
      toast.error("Bir hata oluştu!");
    }
  };

  return (
    <div className="new-ticket-page">
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
      <h2 className="form-title">{t("createNewTicket")}</h2>

      {isSuccess && (
        <p className="success-message">Ticket created successfully!</p>
      )}
      {error && <p className="error-message">Failed to create ticket.</p>}

      <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t("title")}</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>{t("description")}</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>{t("category")}</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Network">Network</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
          </select>
        </div>

        <div className="form-group">
          <label>{t("status")}</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? "Submitting..." : t("createTicket")}
        </button>
      </form>
    </div>
  );
}
