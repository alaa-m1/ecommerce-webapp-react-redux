import { Box } from "@mui/material";
import ShopCategoriesList from "components/ShopCategoriesList";
import ShopCategory from "components/ShopCategory";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categoriesRes } from "shared";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("category");
  const mainCategories = useMemo(
    () =>
      categoriesRes.reduce<Array<string>>((res, category) => {
        if (!res.includes(category.categoryLabel)) {
          res.push(category.categoryLabel);
        }
        return res;
      }, []),
    []
  );

  const targetCategory = useMemo(
    () =>
      categoriesRes.filter((cat, index) => cat.categoryLabel === searchQuery),
    [searchQuery]
  );

  return (
    <Box className="mainContainer">
      <Box
        className="shop-nav"
      >
        {mainCategories.map((item) => (
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
          mainCategories={mainCategories}
          categories={categoriesRes}
        />
      )}
    </Box>
  );
};

export default Shop;
