import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = (selector: string) => {
  const transitionElement = document.getElementById(selector);

  if (transitionElement) {
    const tl = gsap.timeline();

    tl.set(transitionElement, {
      opacity: 0,
    }).to(transitionElement, {
      opacity: 1.2,
      ease: "sine.in",
      duration: 1,
    });

    // const tl = gsap.timeline();
  }
};
export const animatePageOut = (
  href: string,
  router: AppRouterInstance,
  selector: string
) => {
  const animationWrapper = document.getElementById(selector);

  if (animationWrapper) {
    const tl = gsap.timeline();

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
