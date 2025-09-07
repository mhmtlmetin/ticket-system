import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllTicketsQuery } from "../services/tickets.service";
import { useTranslation } from "react-i18next";
import TicketCard from "../components/ticketCard";
import "../styles/UserDashboard.scss";
import TicketFilter from "../components/ticketFilter";

export default function AdminDashboard(){
    const { data = [], error, isLoading } = useGetAllTicketsQuery();
  const [filteredRequests, setFilteredRequests] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log(data, "datas");
  useEffect(() => {
    if (data.length > 0) {
      setFilteredRequests(data);
    }
  }, [data]);
  return (
    <div className="user-container">
      <div className="profile"></div>
      <div className="filter">
        <TicketFilter
          requests={data}
          onFilter={(filtered) => setFilteredRequests(filtered)}
        />
        <button className="add-ticket" onClick={() => navigate("/new-ticket")}>
          {t("addNewTicket")}
        </button>
      </div>
      <div className="content">
        {(filteredRequests?.length > 0 ? filteredRequests : data)?.map(
          (item) => (
            <TicketCard key={item.id} request={item} />
          )
        )}
      </div>
    </div>
  );
}