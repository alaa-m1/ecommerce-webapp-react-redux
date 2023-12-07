import React from "react";
import { Box, Typography } from "@mui/material";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import _ from "lodash";
import { useTranslation } from "react-i18next";

type ShopNavProps = {
  mainCategoriesLabels: Array<string>;
  activeCategoryLabel: string;
};

export const ShopNav = ({
  mainCategoriesLabels,
  activeCategoryLabel,
}: ShopNavProps) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <Box className="shop-nav" sx={{ color: "secondary.dark" }}>
      {mainCategoriesLabels.map((item) => (
        <Link
          key={_.uniqueId()}
          to={`?category=${item}${
            searchParams.get("search")
              ? `&search=${searchParams.get("search")}`
              : ""
          }`}
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
      {mainCategoriesLabels.length === 0 ? (
        <Typography
          color={
            activeCategoryLabel === "" ? "secondary.main" : "primary.light"
          }
        >
          {t("search.no_categories")}
        </Typography>
      ) : (
        <Link
          to={`${location.pathname}${
            searchParams.get("search")
              ? `?search=${searchParams.get("search")}`
              : ""
          }`}
          style={{ margin: "0px 15px" }}
        >
          <Typography
            color={
              activeCategoryLabel === "" ? "secondary.main" : "primary.light"
            }
          >
            {!_.isEmpty(mainCategoriesLabels) ? `All categories` : ""}
          </Typography>
        </Link>
      )}
    </Box>
  );
};
