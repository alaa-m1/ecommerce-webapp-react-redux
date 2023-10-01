import { Box, IconButton, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import _ from "lodash";

export const SearchForProducts = () => {
  const { t } = useTranslation();
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(() => {
    const searchValue = searchParams.get("search");
    if (!_.isNull(searchValue)) {
      return searchValue;
    } else return "";
  });
  const handleApplySearch = () => {
    if (_.isEmpty(searchValue)) {
      if (searchParams.has("search")) searchParams.delete("search");
      setSearchParams(searchParams);
    } else {
      searchParams.set("search", searchValue);
      setSearchParams(searchParams);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    if (_.isEmpty(newSearch)) {
      if (searchParams.has("search")) searchParams.delete("search");
      setSearchParams(searchParams);
    }
    setSearchValue(newSearch);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

  return (
    <Box className="search-panel">
      <TextField
        id="supplier_dashboard_textfield_search"
        placeholder={t("search.search_for_products")}
        size="small"
        variant="standard"
        type="search"
        InputProps={{
          endAdornment: (
            <IconButton size="small" onClick={handleApplySearch}>
              <SearchIcon  sx={{"path":{color:"secondary.main"}}}/>
            </IconButton>
          ),
        }}
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};
