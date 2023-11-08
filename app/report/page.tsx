import ReportForm from "../components/ReportForm";

export default function ReportPage() {
  return (
    <>
      <section className="h-fit">
        <div
          className="absolute h-full top-0 left-0 bottom-0 w-full -z-10
          custom-background">
          <div className="custom-clip-path h-screen w-screen bg-white/10"></div>
        </div>
        <ReportForm />
      </section>
    </>
  );
}

