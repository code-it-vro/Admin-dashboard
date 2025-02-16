"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user, {
        headers: { "Content-Type": "application/json" },
      });
      const {username} = response.data;
      localStorage.setItem("username", username);
      toast.success("Login successful");
      router.push("/getProfile");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-black text-white p-10 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Login</h2>
        <input
          className="w-full p-3 mb-4 border border-gray-500 rounded-xl bg-gray-100 text-black"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="w-full p-3 mb-6 border border-gray-500 rounded-xl bg-gray-100 text-black"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className={`w-full p-3 rounded-xl transition-all ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
          }`}
          onClick={onLogin}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
