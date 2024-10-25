"use client";

import { motion } from "framer-motion";

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      id="motion-div"
      // initial={{ y: 20, opacity: 0 }}
      // animate={{ y: 0.1, opacity: 1 }}
      initial={{ x: 20 }}
      animate={{ x: 0.1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      // className="relative z-[20]"
      style={{ height: "100%", willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
