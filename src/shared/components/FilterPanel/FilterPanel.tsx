import React from "react";
import { Grid, useTheme } from "@mui/material";
import { ProductsSearch } from "./ProductsSearch";
import { SortTypeSelect } from "./SortTypeSelect";
import { SortOptions } from "types";

export const FilterPanel = ({ sortOptions }: FilterPanelProps) => {
    const theme=useTheme()
  return (
    <Grid container columnSpacing={2} mt={1} data-testid="FilterPanel-div">
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "flex-end", [theme.breakpoints.down('md')]:{justifyContent: "center"}  }}
      >
        <ProductsSearch />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "flex-start", [theme.breakpoints.down('md')]:{justifyContent: "center"} }}
      >
        <SortTypeSelect options={sortOptions} />
      </Grid>
    </Grid>
  );
};

type FilterPanelProps = {
  sortOptions: SortOptions;
};
