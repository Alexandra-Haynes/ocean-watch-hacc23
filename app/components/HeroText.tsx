import React from "react";
import DonateButton from "./DonateButton";

const HeroText = () => {
  return (
    <div className="md:ml-6 flex flex-col items-start justify-center gap-2 lg:gap-6">
      <img
        src="./assets/hpu logo.png"
        className="max-w-[160px] xl:max-w-[400px] lg:max-w-[300px] 
      hidden lg:block"
      />
      <div className="h-[1px] w-[300px] bg-blue-300/20 hidden lg:block my-4"></div>
      <h1 className="text-2xl lg:text-4xl xl:text-6xl font-extrabold text-white text-center lg:text-left">
        <p className="lg:hidden uppercase mb-2 mt-6">
          Hawai's Pacific University
        </p>
        Center for Marine Debris Research
      </h1>

      <p
        className="text-blue-100/80 lg:text-xl 
        xl:text-2xl max-w-[300px] lg:max-w-[500px] 
      hidden lg:block font-normal"
      >
        World's premier center for pioneering plastic pollution research
      </p>
      <div className="hidden lg:block">
        <DonateButton />
      </div>
    </div>
  );
};

export default HeroText;
