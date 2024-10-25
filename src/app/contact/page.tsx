import Image from "next/image";

import { SocialLinks } from "@/constants";

type Props = {};

const ContactPage = ({}: Props) => {
  return (
    <>
      <div className="px-8">
        <div className="mt-16 sm:mt-32 grid grid-cols-3 gap-4">
          <div className="col-start-1 col-span-3">
            {/* <h1 className="sm:mt-12 uppercase text-labelm sm:text-labelt lg:text-label font-bold ">
              Team Up
            </h1> */}

            {/* <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color ">
              Dream. Design. Discuss.
            </span> */}
            {/* <div className="mt-20 sm:mt-36 lg:mt-32"> */}
            <div>
              <p className="text-hlm sm:text-hlt lg:text-hl">
                Have a project in mind?
              </p>

              <div className="mt-8 sm:mt-8 mb-40 sm:mb-24">
                <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
                  feel free to contact me via
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={SocialLinks.TELEGRAM}
                  className="block text-accent-color uppercase text-[24px]/[24px] sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
                >
                  telegram
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={SocialLinks.INSTAGRAM}
                  className="block text-accent-color uppercase text-[24px]/[24px] sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
                >
                  instagram
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={SocialLinks.TWITTER}
                  className="block text-accent-color uppercase text-[24px]/[24px] sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
                >
                  twitter
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  type="email"
                  href="mailto:zhavoronskaya.public@gmail.com"
                  className="text-accent-color uppercase text-[24px]/[24px] sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
                >
                  email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
