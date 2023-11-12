import Link from "next/link";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ReportSubmitted() {
  return (
    <section className="h-screen">
      <main
        className="bg-cover bg-no-repeat flex h-screen 
      flex-col items-center justify-between px-4"
      >
        <div className="absolute top-0 left-0 w-full h-full -z-10 custom-background">
          <div className="custom-clip-path h-screen w-screen bg-white/10"></div>
        </div>
        <div className="text-center p-6 mt-20 bg-white bg-opacity-80 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Your report has been submitted successfully.
          </p>

          <center>
            <img src="/assets/seal.jpg" alt="Report submitted" width={200} height={200} />
          </center>

          <br />
          <b>Monthly Progress</b>
          <p>Every month, our goal is to have 500 reports submitted.
            Please help us reach our goal by submitting a new report whenever you encounter
            any marine debris.
          </p>
          <ProgressBar now={5} label={`${5}%`} />

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
