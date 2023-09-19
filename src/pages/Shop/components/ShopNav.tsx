import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import _ from "lodash";

type ShopNavProps = {
  mainCategoriesLabels: Array<string>;
  activeCategoryLabel: string;
};

export const ShopNav = ({ mainCategoriesLabels,activeCategoryLabel }: ShopNavProps) => {
  return (
    <Box className="shop-nav">
      {mainCategoriesLabels.map((item) => (
        <Link
          key={_.uniqueId()}
          to={`?category=${item}`}
          style={{ margin: "0px 15px", color:activeCategoryLabel===item?"#00f":"#000" }}
        >
          {item}
        </Link>
      ))}
      <Link to={``} style={{ margin: "0px 15px" }}>
        All categories
      </Link>
    </Box>
  );
};
