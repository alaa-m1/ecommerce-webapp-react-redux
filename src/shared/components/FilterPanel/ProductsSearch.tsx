import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
  InputAdornment,
  FormControl,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";

const updateSearchParams = (
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void,
  newSearch: string,
  deleteOnly = false
) => {
  if (!newSearch.trim()) {
    if (searchParams.has("search")) {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  } else if (!deleteOnly) {
    searchParams.set("search", newSearch);
    setSearchParams(searchParams);
  }
};

export const ProductsSearch = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(() => searchParams.get("search") || "");

  const searchDebounceFn = useMemo(
    () =>
      _.debounce((value: string) => {
        updateSearchParams(searchParams, setSearchParams, value);
      }, 1000),
    [searchParams, setSearchParams]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearch = e.target.value;
      setSearchValue(newSearch);
      updateSearchParams(searchParams, setSearchParams, newSearch, true);
      searchDebounceFn(newSearch);
    },
    [searchDebounceFn, searchParams, setSearchParams]
  );

  const handleApplySearch = useCallback(() => {
    updateSearchParams(searchParams, setSearchParams, searchValue);
  }, [searchValue, searchParams, setSearchParams]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        updateSearchParams(searchParams, setSearchParams, e.currentTarget.value);
      }
    },
    [searchParams, setSearchParams]
  );

  return (
    <Box>
      <FormControl variant="standard" sx={{ m: 1, width: 210 }}>
        <TextField
          id="search_box_id"
          type="search"
          variant="standard"
          label={`${t("search.products_search")}:`}
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          data-testid="FilterPanel-ProductsSearch-text-search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleApplySearch}>
                  <SearchIcon sx={{ path: { color: "secondary.main" } }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Box>
  );
};
