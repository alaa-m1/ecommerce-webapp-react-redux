import React, { useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import BedIcon from "@mui/icons-material/Bed";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { FilterOptions } from "../types";

type SearchFiltersProps = {
  onFilterChange: (filters: FilterOptions) => void;
  onSearch: (filters: FilterOptions) => void;
  isLoading?: boolean;
};

export const SearchFilters = ({ onFilterChange, onSearch, isLoading = false }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    location: "",
    propertyType: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleFilterChange = useCallback(
    (key: keyof FilterOptions, value: string) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      onFilterChange(newFilters);
    },
    [filters, onFilterChange]
  );

  const handleSearch = useCallback(() => {
    onSearch(filters);
  }, [filters, onSearch]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="h6"
        color="primary.light"
        sx={{ mb: 3, fontWeight: 600 }}
      >
        Search Properties
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            label="Location"
            placeholder="Enter city or area"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon color="action" />
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Property Type</InputLabel>
            <Select
              value={filters.propertyType}
              label="Property Type"
              onChange={(e) => handleFilterChange("propertyType", e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <HomeIcon color="action" sx={{ ml: 1 }} />
                </InputAdornment>
              }
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="sale">For Sale</MenuItem>
              <MenuItem value="rent">For Rent</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Bedrooms</InputLabel>
            <Select
              value={filters.bedrooms}
              label="Bedrooms"
              onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <BedIcon color="action" sx={{ ml: 1 }} />
                </InputAdornment>
              }
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="1">1+</MenuItem>
              <MenuItem value="2">2+</MenuItem>
              <MenuItem value="3">3+</MenuItem>
              <MenuItem value="4">4+</MenuItem>
              <MenuItem value="5">5+</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={6} md={3} lg={2}>
          <TextField
            fullWidth
            label="Min Price"
            placeholder="Min"
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon color="action" />
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </Grid>

        <Grid item xs={6} sm={6} md={3} lg={2}>
          <TextField
            fullWidth
            label="Max Price"
            placeholder="Max"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon color="action" />
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </Grid>

        <Grid item xs={12} lg={1} sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSearch}
            disabled={isLoading}
            startIcon={<SearchIcon />}
            sx={{
              py: 1,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};