import React from "react";
import { LoadingSpinner } from "shared";
import { InfoSection, MainCategoriesList } from "./components";
import { useCategoriesLables } from "./hooks";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Box } from "@mui/material";
const HomePage = () => {
  const { allCategories, mainCategoriesLabels, loading } =
    useCategoriesLables();
    const x = useMotionValue(0)
    const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])
    console.log('x=',x);
  return (
    <>
      {loading && <LoadingSpinner />}
      <MainCategoriesList
        mainCategoriesLabels={mainCategoriesLabels}
        categories={allCategories}
      />
      <Box sx={{ m: "auto" }}>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ x, opacity }}
        >
          mmmm
        </motion.div>
      </Box>
      <InfoSection />
    </>
  );
};

export default HomePage;
