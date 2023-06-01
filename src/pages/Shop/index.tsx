import { Box } from "@mui/material";
import ShopCategoriesList from "components/ShopCategoriesList";
import ShopCategory from "components/ShopCategory";
import { useContext, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CategoryContext } from "utils/context/categoryContext";

const Shop = () => {
  const { categories } = useContext(CategoryContext);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("category");
  const mainCategoriesLabels = useMemo(
    () =>
      categories.reduce<Array<string>>((res, category) => {
        if (!res.includes(category.categoryLabel)) {
          res.push(category.categoryLabel);
        }
        return res;
      }, []),
    [categories]
  );

  const targetCategory = useMemo(
    () => categories.filter((cat, index) => cat.categoryLabel === searchQuery),
    [categories, searchQuery]
  );

  return (
    <Box className="mainContainer">
      <Box className="shop-nav">
        {mainCategoriesLabels.map((item) => (
          <Link to={`?category=${item}`} style={{ margin: "0px 15px" }}>
            {item}
          </Link>
        ))}
        <Link to={``} style={{ margin: "0px 15px" }}>
          All categories
        </Link>
      </Box>
      {searchQuery ? (
        <ShopCategory
          categoryLabel={searchQuery}
          targetCategory={targetCategory}
        />
      ) : (
        <ShopCategoriesList
          mainCategoriesLabels={mainCategoriesLabels}
          categories={categories}
        />
      )}
    </Box>
  );
};

export default Shop;
