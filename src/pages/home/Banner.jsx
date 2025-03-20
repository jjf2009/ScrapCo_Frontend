import React, { useEffect, useRef } from "react";
import plastic from "/src/assets/plastic.png";
import metal from "/src/assets/metal.png";
import rubber from "/src/assets/rubber.png";
import banner from "/src/assets/banner2.png";

const Banner = () => {
  const splineRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js";
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const spline = splineRef.current;

    if (spline) {
      spline.addEventListener("mouseenter", () => {
        spline.dispatchEvent(new CustomEvent("openClaw"));
      });

      spline.addEventListener("mouseleave", () => {
        spline.dispatchEvent(new CustomEvent("closeClaw"));
      });
    }
  }, []);

  return (
    <main className="max-w-7xl mx-auto">
    <div className="flex flex-col lg:flex-row items-center justify-between h-screen bg-white px-6 lg:px-16 ">
      {/* Left Section */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
        <h1 className="text-5xl font-bold text-gray-800">Buy! Sell! Scrap!</h1>
        <p className="text-gray-600 mt-4 max-w-md">
          Welcome to <span className="text-green-600 font-semibold">SCRAPCO</span> – Your trusted partner for all scrap solutions. 
          We make buying and selling scrap materials effortless and reliable. Join us in promoting **sustainable recycling** while turning 
          scrap into valuable resources!
        </p>
        <button className="mt-6 px-6 py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition">
          Get Started
        </button>

        {/* Scrap Material Images */}
        <div className="flex justify-center lg:justify-start mt-8 gap-8">
          {[
            { img: rubber, label: "Rubber Scrap" },
            { img: plastic, label: "Plastic Scrap" },
            { img: metal, label: "Metal Scrap" },
          ].map((item, index) => (
            <div key={index} className="relative group">
              <img
                src={item.img}
                alt={item.label}
                className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg shadow-md"
              />
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section (Spline Model) */}
      <div className="relative lg:w-1/2 flex justify-center items-center lg:mt-0">
  <img 
    src={banner}
    alt="Banner Image" 
    className="w-full max-w-[600px] h-auto object-contain"
  />
</div>


    </div>
    </main>
  );
};

export default Banner;
