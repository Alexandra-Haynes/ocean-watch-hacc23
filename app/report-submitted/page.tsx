import Link from "next/link";

export default function ReportSubmitted() {
  return (
    <section className="max-h-screen overflow-y-hidden">
      <main className="bg-cover bg-no-repeat flex flex-col items-center justify-center min-h-screen px-4 relative">
        <div className="absolute top-0 left-0 w-full h-full -z-10 custom-background">
          <div className="custom-clip-path h-screen w-screen bg-white/10"></div>
        </div>

        <div className="text-center p-6 bg-white bg-opacity-80 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Your report has been submitted successfully.
          </p>
          <Link
            href="/"
            className=" text-xl text-white mt-4
             h-[4rem] uppercase rounded-full
           flex flex-col items-center justify-center shadow-lg
           custom-background hover:translate-y-1 hover:shadow-2xl transition duration-500 ease-in-out"
          >
            Return to Home
          </Link>
        </div>
      </main>
    </section>
  );
}
