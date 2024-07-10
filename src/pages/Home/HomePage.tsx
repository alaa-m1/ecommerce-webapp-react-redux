import React from "react";
import { LoadingSpinner } from "shared";
import { InfoSection, MainCategoriesList } from "./components";
import { useCategoriesLables } from "./hooks";

const HomePage = () => {


  const { allCategories, mainCategoriesLabels, loading } = useCategoriesLables();

  return (
    <>
      {loading && <LoadingSpinner />}
      <MainCategoriesList
        mainCategoriesLabels={mainCategoriesLabels}
        categories={allCategories}
      />
      <InfoSection />
    </>
  );
};

export default HomePage;
