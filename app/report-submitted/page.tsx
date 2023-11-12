import HeroText from "../components/HeroText";
import Navbar from "../components/Navbar";

export default function ReportSubmitted() {
  return (
    <section className="max-h-screen overflow-y-hidden">
      <Navbar />
      <main
        className="bg-cover bg-no-repeat flex min-h-screen 
          flex-col items-center justify-between px-4"
      >
        <div
          className="absolute top-0 left-0 w-full h-full -z-10
              custom-background"
        >
          <div className="custom-clip-path h-screen w-screen bg-white/10"></div>
        </div>
        <h1
          className="text-white-700 text-xl font-semibold uppercase
        transition-all ease-in-out justify-center"
        >
          Thank you!
        </h1>
      </main>
    </section>
  );
}
