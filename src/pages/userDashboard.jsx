import { useState, useEffect } from "react";
import { useGetAllTicketsQuery } from "../services/tickets.service";
import TicketCard from "../components/ticketCard";
import "../styles/UserDashboard.scss";
import TicketFilter from "../components/ticketFilter";

export default function UserDashboard() {
  const { data=[], error, isLoading } = useGetAllTicketsQuery();
  const [filteredRequests, setFilteredRequests] = useState([]);
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
      </div>
      <div className="content">
       {(filteredRequests?.length > 0 ? filteredRequests : data)?.map((item) => (
          <TicketCard key={item.id} request={item} />
        ))}
      </div>
    </div>
  );
}
