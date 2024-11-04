import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  const transitionElement = document.getElementById("transition-element");

  if (transitionElement) {
    const tl = gsap.timeline();
    console.log("INNNNN");
    tl.set(transitionElement, {
      opacity: 0,
    }).to(transitionElement, {
      opacity: 1.2,
      ease: "sine.in",
      duration: 1,
    });
  }
};
export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const animationWrapper = document.getElementById("transition-element");

  if (animationWrapper) {
    const tl = gsap.timeline();
    console.log("OUUUT");
    tl.set(animationWrapper, {
      opacity: 1,
    }).to(animationWrapper, {
      opacity: 0,
      ease: "sine.out",
      duration: 1.2,
      onComplete: () => {
        router.push(href);
      },
    });
  }
};
