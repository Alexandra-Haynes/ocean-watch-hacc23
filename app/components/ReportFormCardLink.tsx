import Link from "next/link";
import { BiSolidPhoneCall } from "react-icons/bi";
import { LuBadgeAlert } from "react-icons/lu";

export default function ReportFormCardLink() {
  return (
    <>
      <Link
        className="rounded lg:overflow-hidden  mt-12
         h-[1100px] lg:h-[1200px] w-[700px] bg-white 
         shadow-2xl flex flex-col items-center justify-start
         relative hover:shadow-2xl transition duration-300 ease-out -z-10"
        href={`/report`}
      >
        <div className="flex flex-col items-center justify-start mt-[5rem]">
          <h2
            className="text-black text-center font-bold text-3xl mb-6 
           uppercase"
          >
            Found Marine Debris?
          </h2>
          <h3
            className="max-w-[300px] text-xl text-center mb-6 font-semibold
           text-slate-700"
          >
            Report It Here, and We&apos;ll Take Care of the Removal
          </h3>
        </div>
        <div
          className=" text-xl text-white mt-4
           w-1/2 h-[4rem] uppercase rounded-full
          flex flex-col items-center justify-center shadow-lg
          custom-background hover:translate-y-1 hover:shadow-2xl transition duration-500 ease-in-out
          "
        >
          Report debris
        </div>

        <div
          className="h-[240px] w-2/3 bg-cyan-300/10 rounded-md shadow-lg
flex flex-col items-center justify-center mt-8 gap-2 py-4"
        >
          <LuBadgeAlert className="text-6xl text-orange-400" />
          <p className="font-semibold px-6 text-black text-center text-lg">
            Are there marine animals entangled in the debris?
          </p>
          <p className="text-black">Call NOAA immediately at </p>
          <p className="text-xl text-black font-bold flex flex-row items-center justify-center gap-2">
            <BiSolidPhoneCall />
            1-888-256-9840
          </p>
          <p className="text-black text-[.8rem]">24/7 Emergency Hotline</p>
        </div>
        <div
          className="h-[400px] lg:h-[600px] w-full absolute bottom-0 bg-slate-900
        bg-[url('/assets/sealion.png')] bg-cover bg-no-repeat bg-bottom"
        ></div>
      </Link>
    </>
  );
}
