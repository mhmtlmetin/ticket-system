import { useState } from "react";
import { useGetAllTicketsQuery } from "../services/tickets.service";
import TicketCard from "../components/ticketCard";


export default function UserDashboard() {
  const { data, error, isLoading } = useGetAllTicketsQuery();
  console.log(data,"datas")
  return (
    <div>
      {data?.map((item) => (
        <TicketCard key={item.id} request={item} />
      ))}
    </div>
  );
}
