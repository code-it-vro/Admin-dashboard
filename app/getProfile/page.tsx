"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GetProfilePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Get username from local storage (stored after login)
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      // Redirect to login if no username found
      router.push("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-gray-700 text-white p-10 rounded-2xl shadow-2xl w-96 text-center">
        <h2 className="text-3xl font-extrabold mb-4">Welcome back</h2>
        <p className="text-2xl font-bold">{username}</p>
      </div>
    </div>
  );
}
