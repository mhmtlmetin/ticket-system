import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/ticketFilter.scss";
export default function TicketFilter({ requests = [], onFilter = () => {} }) {
  const [query, setQuery] = useState("");
  const { t } = useTranslation();
  const handleChange = (e) => {
    const raw = e.target.value;
    setQuery(raw);

    const q = raw.trim().toLowerCase();

    const filtered =
      q === ""
        ? requests
        : requests.filter((req) => {
            const title = String(req?.title ?? "").toLowerCase();
            const category = String(req?.category ?? "").toLowerCase();
            const status = String(req?.status ?? "").toLowerCase();
            return (
              title.includes(q) || category.includes(q) || status.includes(q)
            );
          });

    console.log("[TicketFilter] query:", q, "→ results:", filtered.length);
    onFilter(filtered);
  };

  return (
    <div className="smart-request-list">
      <input
        type="text"
        placeholder={t("search")}
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
