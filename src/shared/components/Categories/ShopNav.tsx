import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import _ from "lodash";

type ShopNavProps = {
  mainCategoriesLabels: Array<string>;
  activeCategoryLabel: string;
};

export const ShopNav = ({
  mainCategoriesLabels,
  activeCategoryLabel,
}: ShopNavProps) => {
  return (
    <Box className="shop-nav" sx={{color:"secondary.dark"}}>
      {mainCategoriesLabels.map((item) => (
        <Link
          key={_.uniqueId()}
          to={`?category=${item}`}
          style={{ margin: "0px 15px" }}
        >
          <Typography
            color={
              activeCategoryLabel === item ? "secondary.main" : "primary.light"
            }
          >
            {item}
          </Typography>
        </Link>
      ))}
      <Link to={``} style={{ margin: "0px 15px" }}>
        <Typography
          color={
            activeCategoryLabel === "" ? "secondary.main" : "primary.light"
          }
        >
          {!_.isEmpty(mainCategoriesLabels) ? `All categories` : ``}
        </Typography>
      </Link>
    </Box>
  );
};
