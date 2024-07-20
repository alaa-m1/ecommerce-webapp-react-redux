import React, { useState, useEffect, useMemo } from "react";
import {
  DataTable,
  DataTableDataSelectableEvent,
  DataTableExpandedRows,
  DataTableFilterMeta,
  DataTableRowEvent,
  DataTableValueArray,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { CartCategories, CartCategory } from "types";
import { Box } from "@mui/material";
import { useCategoriesLables } from "pages/Home/hooks";
import "./ItemsDataTable.scss";
import {
  CustomDataTable,
  ExportColumns,
} from "shared/components/CustomDataTable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useCheckoutDataTable1ExpansionColumns } from "../hooks/useCheckoutDataTable1ExpansionColumns";

type CheckoutDataTableProps = {
  rows: CartCategories;
};

export type MappedCartCategory = Omit<CartCategory, "categoryLabel"> & {
  categoryLabel: {
    name: string;
    image: string;
  };
  status: "low" | "medium" | "high";
  orders: Array<Order>;
};
type Order = { name: string; origin: string; code: string };

export type Option = {
  name: string;
  image: string;
};
export const CheckoutDataTableExpansion = ({
  rows,
}: CheckoutDataTableProps) => {
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const [customers, setCustomers] = useState<any | null>(null);
  const [selectedItems, setSelectedItems] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const { allCategories, mainCategoriesLabels } = useCategoriesLables();
  const categoryLabels: Option[] = useMemo(
    () =>
      mainCategoriesLabels.map((item) => ({
        name: item,
        image: "amyelsner.png",
      })),
    [mainCategoriesLabels]
  );

  const initFilters: DataTableFilterMeta = useMemo(
    () => ({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      categoryLabel: { value: null, matchMode: FilterMatchMode.IN },
      title: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      description: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      price: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: { value: null, matchMode: FilterMatchMode.EQUALS },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
    }),
    []
  );
  useEffect(() => {
    const mappedRows: MappedCartCategory[] = rows.map((item) => ({
      ...item,
      categoryLabel: {
        name: item.categoryLabel,
        image: "amyelsner.png",
      },
      status:
        item.quantity > 10 ? "high" : item.quantity > 5 ? "medium" : "low",
      orders: [
        { name: `nn ${item.title}`, code: `${item.id}-*`, origin: " USA" },
        { name: `nn ${item.title}`, code: `${item.id}-*`, origin: " China" },
        { name: `nn ${item.title}`, code: `${item.id}-*`, origin: " Europ" },
        { name: `nn ${item.title}`, code: `${item.id}-*`, origin: " Japan" },
        { name: `nn ${item.title}`, code: `${item.id}-*`, origin: " Egypt" },
      ],
    }));
    setCustomers(mappedRows);
    setLoading(false);
  }, [rows]);

  const onRowExpand = (event: DataTableRowEvent) => {
    console.log("Product Expanded");
  };

  const onRowCollapse = (event: DataTableRowEvent) => {
    console.log("Product Collapsed");
  };

  const expandAll = () => {
    const _expandedRows: DataTableExpandedRows = {};

    customers.forEach((p: any) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(undefined);
  };
  const rowExpansionTemplate = (data: MappedCartCategory) => {
    return (
      <Box
        sx={{
          minHeight: "100px",
          ".p-datatable-wrapper": {
            padding: "5px",
          },
        }}
      >
        <h5>Orders for {data.categoryLabel.name}</h5>
        <DataTable value={data.orders} size="large">
          {/* <Column field="id" header="Id" sortable></Column>
          <Column field="customer" header="Customer" sortable></Column>
          <Column field="date" header="Date" sortable></Column> */}
          <Column
            field="name"
            header="Name"
            // body={amountBodyTemplate}
            sortable
          ></Column>
          <Column
            field="origin"
            header="Origin"
            // body={statusOrderBodyTemplate}
            sortable
          ></Column>
          <Column
            field="code"
            header="Code"
            // body={statusOrderBodyTemplate}
            sortable
          ></Column>
        </DataTable>
      </Box>
    );
  };

  const columns = useCheckoutDataTable1ExpansionColumns({
    categoryLabels,
    expandedRows,
  });

  const isSelectable = (data: MappedCartCategory) =>
    data.categoryLabel.name !== "men's clothing";

  const isRowSelectable = (event: DataTableDataSelectableEvent) =>
    event.data ? isSelectable(event.data as MappedCartCategory) : true;

  const rowClassName = (data: MappedCartCategory) =>
    isSelectable(data) ? "" : "p-disabled";

  const isCellSelectable = (event: DataTableDataSelectableEvent) =>
    event.data.field === "categoryLabel" &&
    event.data.value.name === "men's clothing"
      ? false
      : true;

  const cellClassName = (data: any) =>
    data?.name === "men's clothing" ? "p-disabled" : "";

  const exportColumns: ExportColumns[] = useMemo(
    () => [
      { title: "categoryLabel.name", dataKey: "categoryLabel.name" },
      { title: "title", dataKey: "title" },
      { title: "price", dataKey: "price" },
      { title: "Quentity", dataKey: "Quentity" },
      { title: "status", dataKey: "status" },
      { title: "description", dataKey: "description" },
    ],
    []
  );

  return (
    <CustomDataTable
      cellSelection
      value={customers}
      exportColumns={exportColumns}
      columns={columns}
      filters={initFilters}
      isDataSelectable={isCellSelectable}
      cellClassName={cellClassName}
      // rowClassName={rowClassName}
      ////
      sortField="price"
      sortOrder={-1}
      //
      paginator
      rows={10}
      dataKey="id"
      loading={loading}
      // responsiveLayout="scroll"
      globalFilterFields={[
        "categoryLabel",
        "title",
        "description",
        "price",
        "status",
      ]}
      expandedRows={expandedRows}
      onRowToggle={(e) => setExpandedRows(e.data)}
      onRowExpand={onRowExpand}
      onRowCollapse={onRowCollapse}
      rowExpansionTemplate={rowExpansionTemplate}
      selectionMode="single"
      // selectionMode="radiobutton"
      selection={selectedItems}
      onSelectionChange={(e: any) => setSelectedItems(e.value)}
    />
  );
};
