import { useGetAllTicketsQuery,useGetUserByAuthorIdQuery } from "../services/tickets.service";
import { useTranslation } from "react-i18next";
import '../styles/profile.scss'

export default function Profile() {
    const { t } = useTranslation();
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
      <p><strong>{t("username")}:</strong> {userName}</p>
      <p><strong>{t("role")}:</strong> {role}</p>

      <div className="stats">
        <h3>{t("ticketStatistics")}</h3>
        <ul>
          <li>{t("totalTicket")}: {stats.total}</li>
          <li>{t("open")}: {stats.open}</li>
          <li>{t("closed")}: {stats.closed}</li>
          <li>{t("inProgress")}: {stats.inProgress}</li>
        </ul>
      </div>
    </div>
  );
}