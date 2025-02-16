"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/verificationmsg");
    } catch (error) {
      console.error("Signup failed", error);
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-gray-700 text-white p-10 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Signup</h2>
        <input
          className="w-full p-3 mb-4 border border-gray-600 rounded-xl bg-white text-black"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          className="w-full p-3 mb-4 border border-gray-600 rounded-xl bg-white text-black"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="w-full p-3 mb-6 border border-gray-600 rounded-xl bg-white text-black"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className={`w-full p-3 rounded-xl transition-all ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed hover:bg-gray-500"
              : "bg-white text-black hover:bg-gray-200"
          }`}
          onClick={onSignup}
          disabled={buttonDisabled || loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </div>
    </div>
  );
}
