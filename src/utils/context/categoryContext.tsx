import { createContext, useEffect, useState } from "react";
import { categoriesRes } from "shared";
import { Categories } from "types";
import { mapCategory } from "utils/mappingFunctions/mapCategory";

type CategoryProviderProps = {
  children: React.ReactNode;
};

type CreateContextType={
  categories: Categories
}

export const CategoryContext = createContext<CreateContextType>({
  categories:[]
});

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<Categories>([]);
  const value = { categories };
  useEffect(() => {
    const mappedRest = mapCategory(categoriesRes);
    setCategories(mappedRest);
  }, []);

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};
