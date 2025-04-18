"use client";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "How my progress tracked?",
    "What are the prerequisites?",
    "How long will it take to complete?",
    "Can I access the course material offline?",
    "Is this course self-paced?"
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    (<div className="h-[15rem] flex flex-col justify-center  items-center px-4">
      <h2
        className="mb-10 sm:mb-10 text-xl text-center sm:text-5xl dark:text-white text-black">
        Ask SkillShiksha Anything
      </h2>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
    </div>)
  );
}