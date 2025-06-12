"use client";

import { ThreeDMarquee } from "../ui/ThreeDMarquee";
import chatapp from "../../assets/Images/chatapp.png"
import signup from '../../assets/image/signup.png'
import cards from '../../assets/image/cards.png'
import chats from '../../assets/image/chats.png'
import educational from '../../assets/image/educational.png'
import highlightcard from '../../assets/image/highlightcard.png'
import twocards from '../../assets/image/twocards.png'
import markascompletelecture from '../../assets/image/markascompletelecture.png'
import lecture from '../../assets/image/lecture.png'
import topCourses from '../../assets/image/topCourses.png'
export function ThreeDMarqueeDemo() {
  const images = [
    chatapp,
    signup,
    educational,
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    highlightcard,
    markascompletelecture,
    cards,
    highlightcard,
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    chatapp,
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    signup,
    educational,
    chatapp,
    twocards,
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    topCourses,
    lecture,
    chats,
    highlightcard,
    topCourses,
    chats,
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ];

  return (
    <div className="rounded-3xl my-6 bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
      <ThreeDMarquee images={images} />
    </div>
  );
}
