type IconProps = {
  size?: string;
  color?: string;
  className?: string;
  onClick?: () => void;
};

export function LogoIcon() {
  return (
    <svg width="32px" viewBox="0 0 12 12" fill="none">
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

export const LeftArrowIcon = ({
  color = "var(--clr-text)",
  size = "24px",
}: IconProps) => {
  return (
    <svg
      width={size}
      fill={color}
      viewBox="0 0 30 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 10.5H30V14.5H8L15.5 22L12.5 25L0 12.5L12.5 0L15.5 3L8 10.5Z" />
    </svg>
  );
};

export const RightArrowIcon = ({
  color = "var(--clr-text)",
  size = "24px",
}: IconProps) => {
  return (
    <svg
      width={size}
      fill={color}
      viewBox="0 0 30 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 14.5H0V10.5H22L14.5 3L17.5 0L30 12.5L17.5 25L14.5 22L22 14.5Z" />
    </svg>
  );
};

export const ExpandIcon = ({
  size = "24px",
  color = "black",
  className,
  onClick,
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
      className={className}
    >
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
    </svg>
  );
};

export const ShrinkIcon = ({
  size = "24px",
  color = "black",
  ...props
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8" />
      <path d="M9 19.8V15m0 0H4.2M9 15l-6 6" />
      <path d="M15 4.2V9m0 0h4.8M15 9l6-6" />
      <path d="M9 4.2V9m0 0H4.2M9 9 3 3" />
    </svg>
  );
};

export const RefreshIcon = ({
  size = "24px",
  color = "black",
  ...props
}: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
};
