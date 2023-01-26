import styles from "./IconLogo.module.css";

export default function IconLogo() {
  // return (
  //     <img className={styles.icon}
  // src="/BirdFlying.svg"
  // alt="Bird Flying"
  // />)
  return (
    <svg
      className={styles.birdSvg}
      width="12px"
      //   height="40px"
      viewBox="0 0 12 12"
      fill="none"
    >
      {/* <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
      <path
        d="M10.7315 9.5H7.6933L2.77003 5.02429L4.47483 3.66045L10.7315 9.5Z"
        stroke="rgb(81, 81, 81)"
      />
      <path
        d="M7.7067 9.5H0.5V0.5H7.7067L3.16366 4.63003L2.7567 5L3.16366 5.36997L7.7067 9.5Z"
        stroke="rgb(81, 81, 81)"
      />
      <rect x="3" y="11" width="3" height="1" fill="black" />
      <rect y="11" width="3" height="1" fill="black" />
      <rect x="3" y="10" width="1" height="1" fill="black" />
      <rect x="1" y="10" width="1" height="1" fill="black" />
      <rect x="2" y="2" width="1" height="1" fill="black" />
      <rect x="10" y="3" width="1" height="1" fill="black" />
      <rect x="8" y="2" width="1" height="1" fill="black" />
      <rect x="11" width="1" height="1" fill="black" />
    </svg>
  );
}
