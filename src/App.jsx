import { useState } from "react";
import Login from "./pages/login";
import { useGetAllTicketsQuery } from "./services/tickets.service.js";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const {data, error, isLoding}= useGetAllTicketsQuery();
  console.log(data)
  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  };



  return null;
}

export default App;