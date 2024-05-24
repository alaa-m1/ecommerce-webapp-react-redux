import React from "react";
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type Props = {
  targetId: string;
  children?: React.ReactElement;
  threshold?: number;
};

export const ScrollToTop = ({ targetId, children, threshold = 200 }: Props) => {
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector(`#${targetId}`);
    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        {children ?? (
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        )}
      </Box>
    </Fade>
  );
};
