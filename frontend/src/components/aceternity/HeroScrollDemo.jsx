"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import websiteherosection from "../../assets/Images/websiteherosection.png"

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden -mt-49">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-red-800">
              Discover the strength  <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Inside You
              </span>
            </h1>
          </>
        }>
        <img
          src={websiteherosection}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>
  );
}
