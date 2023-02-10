export const LeftArrowIcon = ({ color = "var(--clr-text)", width = 16 }) => {
  return (
    <svg
      width={width}
      fill={color}
      viewBox="0 0 30 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 10.5H30V14.5H8L15.5 22L12.5 25L0 12.5L12.5 0L15.5 3L8 10.5Z" />
    </svg>
  );
};

export const RightArrowIcon = ({ color = "var(--clr-text)", width = 16 }) => {
  return (
    <svg
      width={width}
      fill={color}
      viewBox="0 0 30 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 14.5H0V10.5H22L14.5 3L17.5 0L30 12.5L17.5 25L14.5 22L22 14.5Z" />
    </svg>
  );
};
