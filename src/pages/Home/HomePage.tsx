import React from "react";
import { LoadingSpinner } from "shared";
import { InfoSection, MainCategoriesList } from "./components";
import { useCategoriesLables } from "./hooks";

const HomePage = () => {
  const { allCategories, mainCategoriesLabels, loading } =
    useCategoriesLables();
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: "100%" }}>
      {loading && <LoadingSpinner />}
      <MainCategoriesList
        mainCategoriesLabels={mainCategoriesLabels}
        categories={allCategories}
      />
      <div style={{ flexGrow: 1 }} />
      <InfoSection />
    </div>
  );
};

export default HomePage;
