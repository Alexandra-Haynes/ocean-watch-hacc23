import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="bg-cover bg-no-repeat flex min-h-screen flex-col items-center justify-between px-4 ">
        <div
          className="absolute top-0 left-0 w-full h-full -z-10"
          // style={{
          //   backgroundImage: `url('/assets/image (4).jpg')`,
          //   backgroundSize: "cover",
          //   backgroundRepeat: "no-repeat",
          // }}
        ></div>
          <Link className="w-1 h-1" href="/report">
            <h2 className="text-white">Report Debris</h2>
          </Link>
          <Link className="w-1 h-1" href="/remove">
            <h2 className="text-white">Remove Debris</h2> 
          </Link>
          <Link className="w-1 h-1" href="/transport">
            <h2 className="text-white">Transport Debris</h2> 
          </Link>
          <Link className="w-1 h-1" href="/store">
            <h2 className="text-white">Store Debris</h2> 
          </Link>
          <Link className="w-1 h-1" href="/results">
            <h2 className="text-white">View Debris Reports</h2> 
          </Link>
      </main>
      <Footer />
    </>
  );
};

export default Home;
