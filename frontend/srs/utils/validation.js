export const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
export const isValidPhone = (v) => /^\+?\d{9,15}$/.test(v.replace(/[\s()-]/g, ""));

export const validateRegister = ({ name, lastName, phoneNumber, email, password, confirm }) => {
  const e = {};
  if (!name.trim()) e.name = "Введите имя";
  if (!lastName.trim()) e.lastName = "Введите фамилию";
  if (phoneNumber && !isValidPhone(phoneNumber)) e.phoneNumber = "Некорректный телефон";
  if (!email.trim()) e.email = "Введите email";
  else if (!isValidEmail(email)) e.email = "Некорректный email";
  if (!password) e.password = "Введите пароль";
  else if (password.length < 6) e.password = "Минимум 6 символов";
  if (password !== confirm) e.confirm = "Пароли не совпадают";
  return e;
};

export const validateLogin = ({ email, password }) => {
  const e = {};
  if (!email.trim()) e.email = "Введите email";
  else if (!isValidEmail(email)) e.email = "Некорректный email";
  if (!password) e.password = "Введите пароль";
  return e;
};