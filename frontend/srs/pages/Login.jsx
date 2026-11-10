import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/auth";
import { validateLogin } from "../utils/validation";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
    setServerError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerError("");
    const v = validateLogin(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    try {
      await login({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      navigate("/profile");
    } catch (err) {
      setServerError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <form className="card" onSubmit={submit} noValidate>
        <h1>Вход</h1>
        <Alert>{serverError}</Alert>

        <Input label="Email" name="email" type="email" value={form.email} onChange={change} error={errors.email} />
        <Input label="Пароль" name="password" type="password" value={form.password} onChange={change} error={errors.password} />

        <Button type="submit" loading={loading}>Войти</Button>

        <p className="muted">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
}