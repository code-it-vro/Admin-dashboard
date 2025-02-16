// VerificationMsg.tsx with Tailwind CSS for modern UI
"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function VerificationMsg() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="bg-black text-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Check Your Mailtrap</h2>
        <p className="mb-6">
          Please check your Mailtrap inbox to complete the verification process, from there you can go to login page.
        </p>
        
      </div>
    </div>
  );
}
