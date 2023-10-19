import { useTranslation } from "react-i18next";
import { SortOptions } from "types";

export const useSortOptions = (): SortOptions => {
  const { t } = useTranslation();
  return [
    {
      label: t("sort.default"),
      value: "default",
    },
    {
      label: t("sort.ascending"),
      value: "asc",
    },
    {
      label: t("sort.descending"),
      value: "desc",
    },
  ];
};
