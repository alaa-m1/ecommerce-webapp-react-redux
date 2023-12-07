import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import React, { useMemo } from "react";
import { SortOptions } from "types";
import { useSearchParams } from "react-router-dom";

export const SortTypeSelect = (props: SortTypeSelectProps) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const SelectMenuItems = useMemo(
    () =>
      props.options.map((item) => (
        <MenuItem
          value={item.value}
          key={_.uniqueId()}
          id={`sort_by_${item.value}`}
        >
          <Typography color="primary.light">
          {item.label}
          </Typography>
        </MenuItem>
      )),
    [props.options]
  );

  return (
    <FormControl variant="standard" sx={{ m: 1, width: 210 }}>
      <InputLabel htmlFor="sort_select_id" disableAnimation>
        {t("sort.sort_by")}:
      </InputLabel>
      <Select
        id="sort_select_id"
        value={searchParams.get("sort") || "default"}
        onChange={(e) => {
          searchParams.set("sort", e.target.value as string);
          setSearchParams(searchParams);
        }}
        label={t("sort.sort_by")}
      >
        {SelectMenuItems}
      </Select>
    </FormControl>
  );
};

type SortTypeSelectProps = {
  options: SortOptions;
};
