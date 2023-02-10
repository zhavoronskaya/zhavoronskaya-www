import styles from "./IconLogo.module.css";

export default function IconLogo() {
  return (
    <svg
      // className={styles.birdSvg}
      width="32px"
      //   height="40px"
      viewBox="0 0 12 12"
      fill="none"
    >
      <g stroke="var(--clr-text)">
        <path d="M10.7315 9.5H7.6933L2.77003 5.02429L4.47483 3.66045L10.7315 9.5Z" />
        <path d="M7.7067 9.5H0.5V0.5H7.7067L3.16366 4.63003L2.7567 5L3.16366 5.36997L7.7067 9.5Z" />
      </g>

      <g fill="var(--clr-text)">
        <rect x="3" y="11" width="3" height="1" />
        <rect y="11" width="3" height="1" />
        <rect x="3" y="10" width="1" height="1" />
        <rect x="1" y="10" width="1" height="1" />
        <rect x="2" y="2" width="1" height="1" />
        <rect x="10" y="3" width="1" height="1" />
        <rect x="8" y="2" width="1" height="1" />
        <rect x="11" width="1" height="1" />
      </g>
    </svg>
  );
}
