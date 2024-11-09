import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = (selector: string) => {
  // console.log("PAGE IN", selector);
  const transitionElements = document.querySelectorAll(selector);
  const tl = gsap.timeline();

  tl.set(transitionElements, {
    opacity: 0,
  }).to(transitionElements, {
    opacity: 1,
    ease: "sine.in",
    duration: 1,
  });
};
export const animatePageOut = (selector: string, onComplete?: () => void) => {
  // console.log("PAGE OUT");
  const transitionElements = document.querySelectorAll(selector);
  const tl = gsap.timeline();

  tl.set(transitionElements, {
    opacity: 1,
  }).to(transitionElements, {
    opacity: 0,
    ease: "sine.out",
    duration: 1.2,
    onComplete,
  });
};
