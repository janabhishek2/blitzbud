import axios from "axios";

export function getUserById(id) {
  return axios.get("http://localhost:5000/api/users/" + id);
}
export function getUsers() {
  return axios.get("http://localhost:5000/api/users");
}
export function register(user) {
  return axios.post("http://localhost:5000/api/users", {
    email: user.username,
    password: user.password,
    name: user.name,
    contact: user.phone,
  });
}

export function deleteUser(id) {
  return axios.delete("http://localhost:5000/api/users/" + id);
}
