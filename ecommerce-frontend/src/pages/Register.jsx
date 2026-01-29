import api from "../api/axios";

export default function Register() {
  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await api.post("/auth/register", data);
    alert("Registered");
  };

  return (
    <form onSubmit={submit}>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" />
      <select name="role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button>Register</button>
    </form>
  );
}
