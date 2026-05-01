import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const TypingIndicator = () => {
  const dotVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    bounce: {
      y: [0, -8, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        py: 1,
      }}
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          variants={dotVariants}
          initial="hidden"
          animate="bounce"
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "rgba(54, 126, 214, 1)",
          }}
          transition={{
            delay: index * 0.1,
          }}
        />
      ))}
    </Box>
  );
};

export { TypingIndicator };
