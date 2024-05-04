import React, { useEffect, useMemo, useState } from "react";
import { selectMappedCategories } from "store/localProducts/localProductsSelector";
import { useAppSelector } from "utils/redux/hooks";
import { GenericDialog, LoadingSpinner } from "shared";
import { InfoSection, MainCategoriesList } from "./components";
import { useProducts } from "pages/ModernCollection/hooks";
import { setProducts } from "store/products/productsActions";
import { useDispatch } from "react-redux";
import _ from "lodash";
import {
  selectMappedProducts,
  selectProductsStatus,
} from "store/products/productsSelector";
import { Typography } from "@mui/material";
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const HomePage = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const dispatch = useDispatch();
  const [open, setOpen]=useState(false)
  /// Using react-query to manage request state with caching (The other good solution to use with Redux is RTK Query)
  const { data, isLoading } = useProducts(100);
  useEffect(() => {
    if (!_.isUndefined(data)) dispatch(setProducts(data));
  }, [data, dispatch]);

  /// Using Redux to manage request status (Comment the last two commands and then uncomment the next two commands)
  // useEffect(() => {
  //   dispatch(fetchProductsAsync() as any);
  // }, [dispatch]);
  // const isLoading=false;

  const onlineCategories = useAppSelector(selectMappedProducts);
  const status = useAppSelector(selectProductsStatus);

  const loading = useMemo(
    () => isLoading || status.loading,
    [isLoading, status.loading]
  );

  const categories1 = useAppSelector(selectMappedCategories);
  const allCategories = useMemo(
    () => [...onlineCategories, ...categories1],
    [categories1, onlineCategories]
  );
  const mainCategoriesLabels = useMemo(
    () =>
      allCategories.reduce<Array<string>>((res, category) => {
        if (!res.includes(category.categoryLabel)) {
          res.push(category.categoryLabel);
        }
        return res;
      }, []),
    [allCategories]
  );
  return (
    <>
    <DatePicker
          label="DatePicker picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
    <DesktopDatePicker
          label="DesktopDatePicker picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />

      {loading && <LoadingSpinner />}
      <MainCategoriesList
        mainCategoriesLabels={mainCategoriesLabels}
        categories={allCategories}
      />
      <InfoSection />
    </>
  );
};

export default HomePage;
