import React from "react";
import ReportForm from "./components/ReportForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
        <ReportForm />
      </main>
      <Footer />
    </>
  );
};

export default Home;
