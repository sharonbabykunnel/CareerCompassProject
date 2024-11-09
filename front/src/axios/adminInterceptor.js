import axios from "axios";
import { BASE_URL } from "../../const/url";

const adminApi = axios.create({
  baseURL: `${BASE_URL}/admin`,
  withCredentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  headers: {
    "Content-Type": "application/json",
  },
});

export default adminApi