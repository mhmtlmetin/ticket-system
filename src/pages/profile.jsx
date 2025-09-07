import { useGetAllTicketsQuery,useGetUserByAuthorIdQuery } from "../services/tickets.service";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("userName"));
  const { data: tickets, isLoading, error } = useGetAllTicketsQuery();
 const { data: users } = useGetUserByAuthorIdQuery(user);
  const userName= users?.filter(u => u.id == user).map(i=>  i.name);
  const role= users?.filter(u => u.id == user).map(i=>  i.role);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Bir hata oluştu.</p>;

  // Kullanıcıya ait ticketleri filtrele
  const userTickets = tickets?.filter(
    (ticket) => String(ticket.createdBy) === String(user)
  ) || [];

  // İstatistik hesaplama
  const stats = {
    total: userTickets.length,
    open: userTickets.filter((t) => t.status === "open").length,
    closed: userTickets.filter((t) => t.status === "closed").length,
    inProgress: userTickets.filter((t) => t.status === "in-progress").length,
  };

  return (
    <div className="profile-page">
      <h2>{userName} - Profil</h2>
      <p><strong>Kullanıcı Adı:</strong> {userName}</p>
      <p><strong>Rol:</strong> {role}</p>

      <div className="stats">
        <h3>Ticket İstatistikleri</h3>
        <ul>
          <li>Toplam Ticket: {stats.total}</li>
          <li>Open: {stats.open}</li>
          <li>Closed: {stats.closed}</li>
          <li>In-Progress: {stats.inProgress}</li>
        </ul>
      </div>
    </div>
  );
}