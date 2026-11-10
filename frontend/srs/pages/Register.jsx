import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/auth";
import { validateRegister } from "../utils/validation";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", lastName: "", phoneNumber: "", email: "", password: "", confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
    setServerError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccess("");
    const v = validateRegister(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    try {
      const { message } = await register({
        name: form.name.trim(),
        lastName: form.lastName.trim(),
        phoneNumber: form.phoneNumber.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      setSuccess(message || "Регистрация прошла успешно!");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setServerError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <form className="card" onSubmit={submit} noValidate>
        <h1>Регистрация</h1>
        <Alert>{serverError}</Alert>
        <Alert type="success">{success}</Alert>

        <Input label="Имя" name="name" value={form.name} onChange={change} error={errors.name} />
        <Input label="Фамилия" name="lastName" value={form.lastName} onChange={change} error={errors.lastName} />
        <Input label="Телефон" name="phoneNumber" value={form.phoneNumber} onChange={change} error={errors.phoneNumber} placeholder="+998 90 123 45 67" />
        <Input label="Email" name="email" type="email" value={form.email} onChange={change} error={errors.email} />
        <Input label="Пароль" name="password" type="password" value={form.password} onChange={change} error={errors.password} />
        <Input label="Повторите пароль" name="confirm" type="password" value={form.confirm} onChange={change} error={errors.confirm} />

        <Button type="submit" loading={loading}>Зарегистрироваться</Button>

        <p className="muted">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
}