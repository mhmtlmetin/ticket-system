import { useState } from "react";
import { useGetAllTicketsQuery } from "../services/tickets.service";
import TicketCard from "../components/ticketCard";
import '../styles/UserDashboard.scss'


export default function UserDashboard() {
  const { data, error, isLoading } = useGetAllTicketsQuery();
  console.log(data,"datas")
  return (
    <div className="user-container">
        <div className="profile">

        </div>
    <div className="content">
          {data?.map((item) => (
        <TicketCard key={item.id} request={item} />
      ))}
    </div>
    </div>
  );
}
