import { useQuery } from "react-query";
import { Property, FilterOptions } from "../types";
import { searchProperties, getFeaturedProperties } from "utils/actions/realEstateActions";
import { queryKeys } from "utils/reactQuery/queryKeys";

export const useRealEstateSearch = (filters: FilterOptions, enabled = true) => {
  return useQuery<Property[]>(
    [queryKeys.searchProperties, filters],
    () => searchProperties(filters),
    {
      enabled,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    }
  );
};

export const useFeaturedProperties = () => {
  return useQuery<Property[]>(
    queryKeys.featuredProperties,
    getFeaturedProperties,
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
    }
  );
};
