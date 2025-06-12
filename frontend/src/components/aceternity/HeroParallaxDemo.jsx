"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";
import login from '../../assets/image/login.png'
import cards from '../../assets/image/cards.png'
import cart from '../../assets/image/cart.png'
import chats from '../../assets/image/chats.png'
import payment from '../../assets/image/payment.png'
import educational from '../../assets/image/educational.png'
import highlightcard from '../../assets/image/highlightcard.png'
import wagonwheel from '../../assets/image/wagonwheel.png'
import twocards from '../../assets/image/twocards.png'
import markascompletelecture from '../../assets/image/markascompletelecture.png'
import codecompile from '../../assets/image/codecompile.png'
import lecture from '../../assets/image/lecture.png'
import topCourses from '../../assets/image/topCourses.png'
import chatapp from "../../assets/Images/chatapp.png"


export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "card",
    link: "/",
    thumbnail:highlightcard,
  },
  {
    title: "lecture",
    link: "/",
    thumbnail:markascompletelecture,
  },
  {
    title: "lecture page",
    link: "/",
    thumbnail:lecture,
    
  },
  {
    title: "payment",
    link: "/",
    thumbnail:payment,
    
  },
  {
    
    title: "chat",
    link: "/",
    thumbnail:chatapp,
  },
  {
    title: "card",
    link: "/",
    thumbnail:cards,
  },
  {
    title: "card",
    link: "/",
    thumbnail:twocards,
  },
  {
    title: "summary",
    link: "/",
    thumbnail:wagonwheel,
  },
  {
    title: "login",
    link: "/",
    thumbnail:login,
  },
  {
    title: "cart page",
    link: "/",
    thumbnail:cart,
  },
  {
    title: "login page",
    link: "/",
    thumbnail:login,
  },
  {
    title: "chat page",
    link: "/",
    thumbnail:chats,
  },
  {
    title: "hero section",
    link: "/",
    thumbnail:educational,
  },
  {
    title: "hero section",
    link:"/",
    thumbnail:codecompile,
  },
  {
    title: "courses",
    link: "/",
    thumbnail: topCourses,
  },
];