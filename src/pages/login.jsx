import { useState } from "react";
import { useLazyLoginQuery } from "../services/auth.service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials, setError } from "../redux/auth/authSlice";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.scss";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, { isLoading }] = useLazyLoginQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t("username_required")),
    password: Yup.string().required(t("password_required")),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await triggerLogin({ username, password }).unwrap();
      if (username.length == 0) {
        return;
      }
      if (result.length > 0) {
        const user = result[0];
        localStorage.setItem("userName", user.id);
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
        toast.error("kullanıcı adı veya şifre hatalı!");
      dispatch(setError("Login failed"));
    }
  };

  return (
    <div className="login-container">
  <Formik
    initialValues={{ username: "", password: "" }}
    validationSchema={validationSchema}
    onSubmit={async (values, { setSubmitting }) => {
    const { username, password } = values;

    if (username.length === 0 || password.length === 0) {
      setSubmitting(false);
      return;
    }

    try {
      const result = await triggerLogin({ username, password }).unwrap();

      if (result.length > 0) {
        const user = result[0];
        localStorage.setItem("userName", user.id);
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
    } finally {
      setSubmitting(false);
    }
  }}
  >
    {(formik) => (
      <form onSubmit={formik.handleSubmit} className="login-box">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("login")}
        </h2>

        <input
          type="text"
          name="username"
          placeholder={t("username")}
          className="w-full mb-4 p-2 border rounded"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        {formik.errors.username && formik.touched.username && (
          <div style={{ color: "red" }}>{formik.errors.username}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder={t("password")}
          className="w-full mb-4 p-2 border rounded"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? t("loading") : t("login")}
        </button>
      </form>
    )}
  </Formik>
</div>

  );
}
