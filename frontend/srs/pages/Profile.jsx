import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="center">
      <div className="card">
        <h1>Профиль</h1>
        <div className="profile-row"><span>Имя:</span> <b>{user?.name}</b></div>
        <div className="profile-row"><span>Фамилия:</span> <b>{user?.lastName}</b></div>
        <div className="profile-row"><span>Email:</span> <b>{user?.email}</b></div>
        {user?.phoneNumber && (
          <div className="profile-row"><span>Телефон:</span> <b>{user.phoneNumber}</b></div>
        )}
        <Button onClick={logout} style={{ marginTop: 12 }}>Выйти</Button>
      </div>
    </div>
  );
}