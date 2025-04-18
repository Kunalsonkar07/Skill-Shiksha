"use client";
import React from "react";
import WavyBackground from "../ui/wavy-background";

export function WavyBackgroundDemo() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-20 mt-11 pt-14">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Welcome to SkillShiksha!
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Sign in or Sign up to unlock a world of learning opportunities and grow your skills.
      </p>
    </WavyBackground>
  );
}