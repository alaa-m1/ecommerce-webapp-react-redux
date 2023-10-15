import { Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import _ from "lodash";
import { Input,InputAdornment, InputLabel, FormControl } from "@mui/material";

export const SearchForProducts = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(() => {
    const searchValue = searchParams.get("search");
    if (!_.isNull(searchValue)) return searchValue;
    else return "";
  });

  const handleApplySearch = useCallback(() => {
    if (_.isEmpty(searchValue)) {
      if (searchParams.has("search")) searchParams.delete("search");
      setSearchParams(searchParams);
    } else {
      searchParams.set("search", searchValue);
      setSearchParams(searchParams);
    }
  }, [searchParams, searchValue, setSearchParams]);

  const searchDebounceFn = useMemo(
    () =>
      _.debounce((searchValue: string) => {
        if (_.isEmpty(searchValue)) {
          if (searchParams.has("search")) searchParams.delete("search");
          setSearchParams(searchParams);
        } else {
          searchParams.set("search", searchValue);
          setSearchParams(searchParams);
        }
      }, 1000),
    [searchParams, setSearchParams]
  );

  const handleDebouncedSearchChange = useCallback(
    (searchValue: string) => searchDebounceFn(searchValue),
    [searchDebounceFn]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearch = e.target.value;
      setSearchValue(newSearch);
      if (_.isEmpty(newSearch)) {
        if (searchParams.has("search")) searchParams.delete("search");
        setSearchParams(searchParams);
      }
      handleDebouncedSearchChange(newSearch);
    },
    [handleDebouncedSearchChange, searchParams, setSearchParams]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      if (e.key === "Enter") {
        if (_.isEmpty(target.value)) {
          if (searchParams.has("search")) searchParams.delete("search");
          setSearchParams(searchParams);
        } else {
          searchParams.set("search", target.value);
          setSearchParams(searchParams);
        }
      }
    },
    [searchParams, setSearchParams]
  );
  return (
    <Box>
      <FormControl variant="standard" sx={{ m: 1, width: 210 }}>
        <InputLabel htmlFor="search_box_id">
          {t("search.search_for_products")}:
        </InputLabel>
        <Input
          id="search_box_id"
          type="search"
          startAdornment={<InputAdornment position="end"></InputAdornment>}
          endAdornment={
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleApplySearch}>
                <SearchIcon sx={{ path: { color: "secondary.main" } }} />
              </IconButton>
            </InputAdornment>
          }
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          data-testid="FilterPanel-SearchForProducts-text-search"
        />
      </FormControl>
    </Box>
  );
};
