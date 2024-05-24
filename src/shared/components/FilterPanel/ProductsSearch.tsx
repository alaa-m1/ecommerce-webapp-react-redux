import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import React, { useCallback, useMemo, useState } from "react";
import _ from "lodash";
import {
  InputAdornment,
  FormControl,
  Box,
  IconButton,
  TextField,
} from "@mui/material";

export const ProductsSearch = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = useCallback(
    (newSearch: string, deleteOnly = false) => {
      if (_.isEmpty(newSearch)) {
        if (searchParams.has("search")) searchParams.delete("search");
        setSearchParams(searchParams);
      } else if (!deleteOnly) {
        searchParams.set("search", newSearch);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams]
  );

  const [searchValue, setSearchValue] = useState(() => {
    const searchValue = searchParams.get("search");
    if (!_.isNull(searchValue)) return searchValue;
    else return "";
  });

  const handleApplySearch = useCallback(() => {
    updateSearchParams(searchValue);
  }, [updateSearchParams, searchValue]);

  const searchDebounceFn = useMemo(
    () =>
      _.debounce((searchValue: string) => {
        updateSearchParams(searchValue);
      }, 1000),
    [updateSearchParams]
  );

  const handleDebouncedSearchChange = useCallback(
    (searchValue: string) => searchDebounceFn(searchValue),
    [searchDebounceFn]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearch = e.target.value;
      setSearchValue(newSearch);
      updateSearchParams(newSearch, true);
      handleDebouncedSearchChange(newSearch);
    },
    [handleDebouncedSearchChange, updateSearchParams]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      if (e.key === "Enter") {
        updateSearchParams(target.value);
      }
    },
    [updateSearchParams]
  );
  return (
    <Box>
      <FormControl variant="standard" sx={{ m: 1, width: 210 }}>
        <TextField
          id="search_box_id"
          type="search"
          variant="standard"
          label={`${t("search.products_search")}:`}
          InputProps={{
            startAdornment: <InputAdornment position="end"></InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleApplySearch}>
                  <SearchIcon sx={{ path: { color: "secondary.main" } }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          data-testid="FilterPanel-ProductsSearch-text-search"
        />
      </FormControl>
    </Box>
  );
};
