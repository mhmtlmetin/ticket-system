import { useState } from "react";
import { useLazyLoginQuery } from "../services/auth.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials, setError } from "../redux/auth/authSlice";
import "../styles/login.scss"
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, { isLoading }] = useLazyLoginQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await triggerLogin({ username, password }).unwrap();
      if (result.length > 0) {
        const user = result[0];
        dispatch(setCredentials(user));

        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        dispatch(setError("Invalid username or password"));
      }
    } catch (err) {
      dispatch(setError("Login failed"));
    }
  };

  return (
    <div className="login-container">
      <form
        onSubmit={handleSubmit}
        className="login-box"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}