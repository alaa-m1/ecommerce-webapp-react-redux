import React, { useEffect } from "react";
import anime from "animejs";
import "./style/animatedComponent.css";
import NotFoundSVG from "./components/NotFoundSVG";
import { Box, Link } from "@mui/material";
import { Link as RouterDomLink } from "react-router-dom";
import { ColoredDevider } from "shared";

const NotFoundPage = () => {
  useEffect(() => {
    anime({
      targets: ".row svg",
      translateY: 10,
      autoplay: true,
      loop: true,
      easing: "easeInOutSine",
      direction: "alternate",
    });

    anime({
      targets: "#zero",
      translateX: 10,
      autoplay: true,
      loop: true,
      easing: "easeInOutSine",
      direction: "alternate",
      scale: [{ value: 1 }, { value: 1.1 }, { value: 1, delay: 250 }],
      // rotateY: { value: '+=180', delay: 800 },
    });
  }, []);

  return (
    <Box>
      <div className="main-container">
        <div className="svg-container">
          <NotFoundSVG />
        </div>
      </div>
      <ColoredDevider />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link
          component={RouterDomLink}
          to="/"
          sx={{ textDecoration: "none", color: "secondary.main" }}
        >
          Home Page
        </Link>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
