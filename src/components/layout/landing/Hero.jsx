import React from "react";
import ButtonOutline from "../../shared/button1";
import ButtonBg from "../../shared/button2";

const Hero = () => {
  return (
    <div className="relative pt-24 h-160 w-full overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/landingPage.png')] 
                  bg-cover bg-center opacity-60"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center text-black text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-[36px] md:text-3xl lg:text-5xl mb-1 drop-shadow-2xl leading-tight font-semibold">
            Discover, Register & Manage Campus Events
          </h1>
          <p className="text-[24px] mb-12 opacity-95 drop-shadow-xl max-w-2xl mx-auto">
            One platform for all college events, clubs, and activities.
          </p>

          <div className="btns flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ButtonOutline text="Manage Your Club" url="/signup1" />
            <ButtonBg text="Explore Events" url="/signup1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
