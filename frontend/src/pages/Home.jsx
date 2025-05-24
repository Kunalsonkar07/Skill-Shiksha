
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
// import { TypeAnimation } from 'react-type-animation';
import Footer from "../components/common/Footer";
import { HeroParallaxDemo } from "../components/aceternity/HeroParallaxDemo";
import { GlowingEffectDemoSecond } from "../components/aceternity/GlowingEffectDemo";
import { PlaceholdersAndVanishInputDemo } from "../components/aceternity/PlaceholdersAndVanishInputDemo";
import { ThreeDCardDemo } from "../components/aceternity/ThreeDCardDemo";
import { LensDemo } from "../components/aceternity/LensDemo";
import { ColourfulTextDemo } from "../components/aceternity/ColourfulTextDemo";
import SearchBar from "../components/core/HomePage/SearchBar";
import CourseSlider from "../components/common/CourseSlider";
import ReviewSlider from "../components/common/ReviewSlider.jsx";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <SearchBar />
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
        {/* Become an Instructor Link */}
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto font-bold rounded-full bg-[#161D29] text-[#999DAA] transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex items-center gap-2 rounded-full transition-all duration-200 px-10 py-[5px] group-hover:bg-[#000814]">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Demos and Components */}
        <PlaceholdersAndVanishInputDemo />
        <HeroParallaxDemo />
        <ColourfulTextDemo />
        <GlowingEffectDemoSecond />
        <div className="w-full flex justify-between align-middle">
          <div className="w-1/2">
            <ThreeDCardDemo />
          </div>
          <div className="w-1/2 mt-10">
            <LensDemo />
          </div>
        </div>

        {/* <ReviewSlider /> */}
        {/* Additional sections like Code Blocks, Highlight Text, etc., can be included below */}
      </div>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-[#000814] text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
        <ReviewSlider />
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;
