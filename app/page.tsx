import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import CardLink from "./components/CardLink";
import ReportFormCardLink from "./components/ReportFormCardLink";

const Home: React.FC = () => {
  return (
    <section className="max-h-screen overflow-y-hidden">
      <Navbar />
      <main className="bg-cover bg-no-repeat flex min-h-screen 
      flex-col items-center justify-between px-4">
        <div
          className="absolute top-0 left-0 w-full h-full -z-10
          custom-background"
        >
          <div className="custom-clip-path h-screen w-screen bg-white/10">
            {/* Your page content goes here */}
          </div>
        </div>
        <div className="flex flex-row flex-wrap w-2/3 justify-around">
          <ReportFormCardLink />
          {/* <CardLink link="report" title="Report Debris" /> */}
          {/* <CardLink link="remove" title="Remove Debris" /> */}
          {/* <CardLink link="transport" title="Transport Debris" /> */}
          {/* <CardLink link="store" title="Store Debris" /> */}
          {/* <CardLink link="results" title="View Debris Reports" /> */}
        </div>
      </main>
      {/* <Footer /> */}
    </section>
  );
};

export default Home;
