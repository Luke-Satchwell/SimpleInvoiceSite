import Image from "next/image";
import React from "react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        <div className="text-center mb-8">
          <Image
            src="/logo.svg"
            width={1000}
            height={1000}
            alt="Invoice App Logo"
            className="mx-auto h-12 w-fit mb-12"
          />
          <h1 className="text-4xl font-bold text-pink-500">
            Invoice Sent Successfully!
          </h1>
          <p className="text-lg mb-8 max-w-sm mx-auto mt-8 text-gray-600">
            Your invoice has been sent to the buyer&apos;s email. Thank you for
            using our service.
          </p>
        </div>
        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-primaryPink to-primaryPurple text-white font-bold py-2 px-6 rounded-md shadow-md transition-transform transform hover:scale-105"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
