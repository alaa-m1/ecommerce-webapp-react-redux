import { Box, Typography } from "@mui/material";
import { deepClone } from "@mui/x-data-grid/utils/utils";
import { Button } from "primereact/button";
import {
  DataTable,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React, { ComponentProps, useState } from "react";
import { useTranslation } from "react-i18next";

type CustomDataTableProps = ComponentProps<typeof DataTable> & {
  columns: React.ReactNode[];
};

export const CustomDataTable = ({
  columns,
  filters: initFilters,
  ...props
}: CustomDataTableProps) => {
  const { t } = useTranslation();
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const [filters, setFilters] = useState<DataTableFilterMeta>(
    initFilters ?? {}
  );

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value ?? "";
    const filtersCopy: DataTableFilterMeta = deepClone(filters);
    if (
      (filtersCopy?.["global"] as unknown as DataTableFilterMetaData)?.value
    ) {
      (filtersCopy["global"] as unknown as DataTableFilterMetaData).value =
        value;
    }

    setFilters(filtersCopy);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Typography>{t("table.general_search")}</Typography>
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder={t("table.search_for")}
        />
      </Box>
    );
  };
  const header = renderHeader();
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  return (
    <DataTable
      {...props}
      header={header}
      showGridlines
      stripedRows
      sortMode="multiple"
      removableSort
      scrollable
      // scrollHeight="flex"
      scrollHeight="200px"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      rowsPerPageOptions={[2, 10, 25, 50]}
      currentPageReportTemplate={t("table.repeat_template")}
      paginatorLeft={paginatorLeft}
      paginatorRight={paginatorRight}
      size="normal"
      // dataKey={props.dataKey ?? id}
      rowHover
      filters={filters}
      filterDisplay="menu"
      // responsiveLayout="scroll"
      emptyMessage={t("table.no_items")}
      dragSelection
      // tableStyle={{ width: '500px',height: '500px' }}
    >
      {columns}
    </DataTable>
  );
};
