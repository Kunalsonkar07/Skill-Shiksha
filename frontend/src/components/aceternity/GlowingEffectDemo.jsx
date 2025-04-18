"use client";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "../ui/glowing-effect";

;

export function GlowingEffectDemoSecond() {
  return (
    (<ul
      className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4 text-white" />}
        title="Learn Web Development:"
        description="Explore the full stack of web development. Build responsive websites, work with modern frameworks, and become a professional web developer." />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4 text-white" />}
        title="Learn Video Editing:"
        description="Enhance your creativity with video editing skills. From basic cuts to advanced effects, learn how to create stunning videos." />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4 text-white" />}
        title="Chat with Friends:"
        description="Connect with your peers through instant messaging. Whether you want to collaborate on a project, ask doubts, or just have a friendly chat, our platform allows seamless communication. You can share images, and links in real-time, making it easier to work together on assignments or clarify concepts. You can also see who's online, making it convenient to reach out to friends and classmates instantly." />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4 text-white" />}
        title="Track Your Status:"
        description="Stay updated on your learning progress with our real-time status tracking feature. You can monitor completed courses, ongoing assignments, and upcoming tasks all in one place." />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4 text-white" />}
        title="Career Guidance"
        description="Get career advice, job search tips, and resume-building support. Prepare for interviews and boost your employability with the help of our experts." />
    </ul>)
  );
}

const GridItem = ({
  area,
  icon,
  title,
  description
}) => {
  return (
    (<li className={`min-h-[14rem] list-none ${area}`}>
      <div
        className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01} />
        <div
          className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              {icon}
            </div>
            <div className="space-y-3">
              <h3
                className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
              md:text-base/[1.375rem]  text-white dark:text-neutral-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>)
  );
};