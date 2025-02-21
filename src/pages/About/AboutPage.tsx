import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { ColoredDevider, ExternalLink, useGetUIThemeMode } from "shared";
import { ProfilePhoto } from "./components";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import { IParallax, Parallax, ParallaxLayer } from "@react-spring/parallax";
import { AnimatedSection } from "./components/AnimatedSection";
import { motion, useAnimation } from "framer-motion";

export const AboutPage = () => {
  const { t } = useTranslation();
  const parallax = useRef<IParallax>(null);
  const themeMode = useGetUIThemeMode();
  const controls = useAnimation();
  return (
    <Box
      style={{
        direction: "ltr",
      }}
    >
      <Parallax
        pages={2}
        ref={parallax}
        style={{
          width: "99%",
          height: "80%",
          background: "url(images/dev-logo.png) no-repeat",
          backgroundPosition: "center",
        }}
      >
        <ParallaxLayer
          offset={0}
          speed={0.2}
          style={{
            backgroundColor: themeMode === "light" ? "#eee" : "#212121",
          }}
        />
        <ParallaxLayer
          offset={1}
          speed={0.2}
          style={{
            backgroundColor: themeMode === "light" ? "#eee" : "#212121",
          }}
        />

        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{
            padding: "5px",
          }}
        >
          <Box mb={3} mt={1}>
            <Box sx={{ display: "flex", justifyContent: "center", m: 2, p: 2 }}>
              <ProfilePhoto />
            </Box>
            <ColoredDevider />
            <Box sx={{ position: "relative", height: "300px" }}>
              <AnimatedSection />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "30%",
                  transform: "translate(-30%, -50%)",
                }}
              >
                <Typography
                  fontSize="18px"
                  color="primary.light"
                  mb="10px"
                  sx={{
                    "& strong": { color: "custom.sub1", fontSize: "1.2rem" },
                    fontSize: "1.1rem",
                  }}
                >
                  {parse(t("about_information"))}
                </Typography>
              </Box>
            </Box>
          </Box>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.4}>
          <Typography
            color="secondary.main"
            fontSize="16px"
            fontWeight="bold"
            style={{ textAlign: "center" }}
          >
            Senior Frontend Developer | React - JavaScript - TypeScript -
            Next.js | Jest - RTL - Test Automation | Software Developer
          </Typography>
          <Typography
            fontSize="18px"
            fontWeight="bold"
            color="primary.light"
            sx={{ textAlign: "center", mt: "60px", mb: "30px" }}
          >
            {t("contact_me")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          >
            <ExternalLink
              url="https://www.linkedin.com/in/alaa-mohammad-767622199/"
              title="LinkedIn"
            />
            <ExternalLink
              url="https://www.xing.com/profile/alaa_mohammad8/cv"
              title="Xing"
            />
            <ExternalLink url="https://github.com/alaa-m1" title="GitHub" />
            <ExternalLink url="https://dev.to/alaa-m1" title="Dev.to" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: "80px",
            }}
          >
            <img
              src="images/dev-logo.png"
              style={{ width: "200px", aspectRatio: "1" }}
              alt="Phoenix Software Al-ankaa logo"
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50px",
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                animate={controls}
                whileHover={{
                  x: 20, // Move to the right by 100px
                  transition: { type: "tween", duration: 0.5 }, // Smooth transition
                }}
                whileTap={{ scale: 1.1 }}
                drag="x"
                dragConstraints={{ left: 100, right: 100 }}
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <Typography color="primary.light" fontSize="2rem">
                  Phoenix Software&nbsp;&nbsp;Al-ankaa
                </Typography>
              </motion.div>
            </Box>
          </Box>
        </ParallaxLayer>
      </Parallax>
    </Box>
  );
};

export default AboutPage;
