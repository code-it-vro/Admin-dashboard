// VerifyEmailPage.tsx with Tailwind CSS for modern UI
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      router.push("/login"); // Redirect to login after verification
    } catch (error: any) {
      setError(error.response?.data?.message || "Verification failed.");
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) setToken(urlToken);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="bg-black text-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Verify Your Email</h2>
        {verified ? (
          <p className="text-green-400 mb-4">Email successfully verified!</p>
        ) : error ? (
          <p className="text-red-500 mb-4">{error}</p>
        ) : (
          <button
            onClick={verifyUserEmail}
            className="w-full bg-white text-black p-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Verify Email
          </button>
        )}
      </div>
    </div>
  );
}
