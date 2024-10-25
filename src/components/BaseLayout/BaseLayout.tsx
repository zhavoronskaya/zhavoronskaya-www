import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "./BaseLayout.module.css";
import Transition from "./Transition";

type Props = {
  children: React.ReactNode;
  decoration?: React.ReactNode;
};

export const PADDING_Y = 64;

const BaseLayout = ({ children, decoration }: Props) => {
  const mainDecorative = decoration ? styles.mainDecorative : "";
  const headerBgRight = decoration ? "33%" : undefined;

  return (
    <>
      <Header bgRight={headerBgRight} />
      {/* <Transition> */}
      <main
        id="base-layout-main"
        className={`${styles.main} ${mainDecorative} relative min-h-full bg-main-container-color sm:mx-6 mx-4 rounded-lg`}
        style={{ paddingTop: PADDING_Y, paddingBottom: PADDING_Y }}
      >
        {children}
      </main>

      {decoration && (
        <div className="z-20 fixed h-full w-[33%] right-0 top-0">
          {decoration}
        </div>
      )}
      {/* </Transition> */}
      <Footer bgRight={headerBgRight} />
    </>
  );
};

export default BaseLayout;
