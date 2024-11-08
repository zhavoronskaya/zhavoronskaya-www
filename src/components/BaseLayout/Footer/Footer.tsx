import Link from "next/link";
import { SocialLinks } from "@/constants";

import { SoundOnIcon } from "@/components/UI/icons";
import SoundToggle from "@/components/SoundToggle";

type Props = {
  bgRight?: string;
};

const Footer = ({ bgRight }: Props) => {
  return (
    <>
      <footer className="fixed h-[64px] left-0  bottom-0 w-full z-[50]">
        <div className="flex justify-between items-center w-full h-16 px-4 sm:px-6 py-4">
          <div className="flex gap-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={SocialLinks.TWITTER}
              className="text-accent-color text-link hover:text-accent-color-active"
            >
              twitter
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={SocialLinks.INSTAGRAM}
              className="text-accent-color text-link hover:text-accent-color-active"
            >
              instagram
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={SocialLinks.TELEGRAM}
              className="text-accent-color text-link hover:text-accent-color-active"
            >
              telegram
            </a>
          </div>
          <SoundToggle sound={true} />
          <div className="">
            <a
              target="_blank"
              rel="noopener noreferrer"
              type="email"
              href="mailto:zhavoronskaya.public@gmail.com"
              className="hidden sm:inline text-accent-color text-link hover:text-accent-color-active"
            >
              {SocialLinks.EMAIL}
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              type="email"
              href="mailto:zhavoronskaya.public@gmail.com"
              className="sm:hidden text-accent-color text-link hover:text-accent-color-active"
            >
              email
            </a>
          </div>
        </div>
      </footer>
      <FooterBackground right={bgRight} />
    </>
  );
};

const FooterBackground = ({ right = "0" }: { right?: string }) => {
  return (
    <div
      className="fixed h-[64px] left-0 bottom-0 bg-background-color z-[49]"
      style={{ right }}
    >
      <div className="absolute sm:right-6 right-4 bottom-16">
        <svg
          width="8"
          viewBox="0 0 8 8"
          fill="#F8F4F4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 8C4.41828 8 8 4.41828 8 0L8 8L0 8Z"
          />
        </svg>
      </div>
      <div className="absolute sm:left-6 left-4 bottom-16">
        <svg
          width="8"
          viewBox="0 0 8 8"
          fill="#F8F4F4"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.17622e-06 0C5.96831e-07 4.41828 3.58172 8 8 8L0 8L1.17622e-06 0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Footer;
