import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {useAuth} from "../AuthContext";
import "./login.css"; 

export default function Login({ onLogin }) {
  const { login } = useAuth(); // ✅ call login from context
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", formData);

    // store token and user
    await login(res.data.token, res.data.user);

    // Redirect based on user role or email

    if (res.data.user.role === "admin" || res.data.user.email === "admin@gmail.com") {
      navigate("/admin"); // replace with your actual admin route
    } 
    else {
      navigate(from); // go to wherever the user came from
    }

  } catch (err) {
    setMessage(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex justify-center items-start  login-background">
      <div className="inner-container mx-auto mt-50 bg-white p-6 rounded shadow-2xl" style={{ width: "30%" }}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 min-w-full justify-center items-center"
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button type="submit" className="home-button self-center">
            Login
          </button>

          <p className="text-amber-700">
            Don't have an account{" "}
            <a href="/register" className="text-amber-700 font-bold decoration-0 hover:decoration-0">
              Signup
            </a>
          </p>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
