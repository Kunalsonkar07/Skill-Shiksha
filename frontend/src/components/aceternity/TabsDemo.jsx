import React from "react";
import { Tabs } from "../ui/tabs"; // Ensure you update this import to the correct file path
import chatapp from "../../assets/Images/chatapp.png"
export function TabsDemo() {
  const tabs = [
    {
      title: "Chat",
      value: "chat",
      content: (
<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#6b46c1] to-autumn-warning-content">
          <p>Chat Tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Dashboard",
      value: "dashboard",
      content: (
<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#6b46c1] to-[#4c1d95]">
          <p>Dashboard Tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Settings",
      value: "setting",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#6b46c1] to-[#4c1d95]">
          <p>Settings Tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Course Section",
      value: "course section",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#6b46c1] to-[#4c1d95]">
          <p>Course Section Tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Contact",
      value: "contact",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#6b46c1] to-[#4c1d95]">
          <p>Contact Tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-40">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <img
      src={chatapp}
      alt="dummyimage"
      className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
