import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-800 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-screen-lg px-4 text-center">
        {/*  Logo Section */}
        <div className="flex justify-center items-center mb-12 mt-4">
          <Image
            src="/logo.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="h-12 w-fit"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-primaryPink">
          Easy Invoice
        </h1>
        {/*  Description Text */}
        <p className="text-lg mb-8 max-w-prose mx-auto">
          Effortlessly create, manage, and send professional invoices in
          minutes. Track your payments and streamline your billing process with
          our user-friendly interface.
        </p>
        {/*  CTA Button  */}
        <Link
          href="/invoice/create"
          className="bg-gradient-to-r from-primaryPink to-primaryPurple text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-primaryPurple hover:to-primaryPink transition duration-300 ease-in-out"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
