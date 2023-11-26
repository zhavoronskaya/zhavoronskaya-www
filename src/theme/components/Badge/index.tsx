import cn from "classnames";
import styles from "./Badge.module.css";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Badge = ({ children, className }: Props) => {
  return <span className={cn(styles.badge, className)}>{children}</span>;
};

export default Badge;
