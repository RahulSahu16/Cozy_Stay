import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const sendOtp = async (email) => {
  const response = await axios.post(`${API}/auth/send-otp`, { email });
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await axios.post(`${API}/auth/verify-otp`, { email, otp });
  return response.data;
};

export const signup = async (name, email, password) => {
  const response = await axios.post(`${API}/auth/signup`, { name, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API}/auth/login`, { email, password });
  return response.data;
};

export const getHomes = async () => {
  const response = await axios.get(`${API}/homes`);
  return response.data;
};

export const getHomeById = async (id) => {
  const res = await axios.get(`${API}/homes/${id}`);
  return res.data;
};