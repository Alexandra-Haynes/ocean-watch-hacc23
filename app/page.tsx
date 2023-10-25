import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import CardLink from "./components/CardLink";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="bg-cover bg-no-repeat flex min-h-screen flex-col items-center justify-between px-4 ">
        {/* <div
          className="absolute top-0 left-0 w-full h-full -z-10"
          // style={{
          //   backgroundImage: `url('/assets/image (4).jpg')`,
          //   backgroundSize: "cover",
          //   backgroundRepeat: "no-repeat",
          // }}
        ></div> */}
          <div className="flex flex-row flex-wrap w-2/3 justify-around">
            <CardLink link="report" title="Report Debris" />
            <CardLink link="remove" title="Remove Debris" />
            <CardLink link="transport" title="Transport Debris" />
            <CardLink link="store" title="Store Debris" />
            <CardLink link="results" title="View Debris Reports" />
          </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
