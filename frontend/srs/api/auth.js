import axios from "axios";

const API = axios.create({
  baseURL: "/api",          // идёт через vite-proxy → http://localhost:5000
  timeout: 10000,           // на случай зависания из-за пустого catch на бэке
  headers: { "Content-Type": "application/json" },
});

const parseMessage = (data, fallback = "Готово") => {
  if (typeof data === "string") return data;
  if (data?.message) return data.message;
  return fallback;
};

export const registerUser = async (payload) => {
  const res = await API.post("/registration", payload);
  return { message: parseMessage(res.data, "Регистрация прошла успешно!") };
};

export const loginUser = async (payload) => {
  const res = await API.post("/login", payload);
  if (typeof res.data === "string") throw new Error(res.data);
  const { password, __v, ...safeUser } = res.data;
  return { user: safeUser };
};

export const getErrorMessage = (err) => {
  if (err.code === "ECONNABORTED") return "Сервер не отвечает. Попробуйте позже.";
  if (!err.response) return "Нет соединения с сервером.";
  const data = err.response.data;
  if (typeof data === "string") return data;
  if (data?.message) return data.message;
  if (data?.error) return data.error;
  // MongoDB E11000 при дубликате email — приходит как 500
  if (err.response.status === 500) return "Ошибка сервера. Возможно, такой email уже зарегистрирован.";
  return "Что-то пошло не так.";
};