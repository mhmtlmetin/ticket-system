import React from "react";
import { data, useParams } from "react-router-dom";
import  {useGetTicketQuery}  from "../services/tickets.service";

function TicketDetail() {
  const { id } = useParams();
  
  const { data:ticket, isLoading, error } = useGetTicketQuery(id);
console.log(data,"data")


  return (
   <div className="ticket-detail">
      <h2>{ticket?.title}</h2>
      <p><strong>Description:</strong> {ticket?.description}</p>
      <p><strong>Category:</strong> {ticket?.category}</p>
      <p><strong>Status:</strong> {ticket?.status}</p>
      <p><strong>Created At:</strong> {new Date(ticket?.createdAt).toLocaleString()}</p>
      <p><strong>Created By:</strong> User #{ticket?.createdBy}</p>
    </div>
  );
}

export default TicketDetail;
