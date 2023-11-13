import Link from "next/link";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

export default function ReportSubmitted() {
  return (
    <section>
      <Navbar />
      <main className="bg-cover bg-no-repeat flex flex-col items-center ">
        <div className="absolute top-0 left-0 w-full -z-10 ">
          <div className="custom-clip-path w-screen bg-white/10"></div>
        </div>
        <div className="text-center p-5 mt-20 bg-white bg-opacity-80 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800">Thank You!</h1>
          <p className="text-lg text-gray-400 mb-6">
            Your report has been submitted successfully.
          </p>

          <center>
            <img
              src="/assets/seal.jpg"
              alt="Report submitted"
              width={200}
              height={200}
            />
          </center>

          <br />
          <b>Monthly Progress</b>
          <p>
            Every month, our goal is to have 500 reports submitted. Please help
            us reach our goal by submitting a new report whenever you encounter
            any marine debris.
          </p>
          <ProgressBar now={3} label={`${3}%`} />

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
