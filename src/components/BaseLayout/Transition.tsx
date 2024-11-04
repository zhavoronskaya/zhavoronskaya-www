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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      // className="relative z-[20]"
      style={{
        height: "100%",
        willChange: "transform, opacity",
        overflow: "auto",
      }}
    >
      {children}
    </motion.div>
  );
}
