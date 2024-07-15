import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { CartCategories, CartCategory } from "types";
import { useTranslation } from "react-i18next";
import { Box, Tooltip, Typography } from "@mui/material";
import { useCategoriesLables } from "pages/Home/hooks";
import { formatCurrency } from "utils/helpers";
import "./ItemsDataTable.scss";
import {
  addToCart,
  decreaseCartItem,
  removeFromCart,
} from "store/shoppingCart/shoppingCartActions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { Tag } from "primereact/tag";

type CheckoutDataTableProps = {
  rows: CartCategories;
};

type MappedCartCategory = Omit<CartCategory, "categoryLabel"> & {
  categoryLabel: {
    name: string;
    image: string;
  };
  status: "low" | "medium" | "high";
};
type Option = {
  name: string;
  image: string;
};
export const CheckoutDataTable = ({ rows }: CheckoutDataTableProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { cartItems } = useAppSelector(selectShoopingCartItemsDetails);
  const { cartCounter } = useAppSelector(selectShoopingCartItemsDetails);
  const [disabled, setDisabled] = useState(false);

  const [customers, setCustomers] = useState<any | null>(null);
  const [selectedCustomers, setSelectedCustomers] = useState<any>(null);

  const [filters, setFilters] = useState({
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
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");
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

  const statuses = ["low", "medium", "high"];

  useEffect(() => {
    const mappedRows: MappedCartCategory[] = rows.map((item) => ({
      ...item,
      categoryLabel: {
        name: item.categoryLabel,
        image: "amyelsner.png",
      },
      status:
        item.quantity > 10 ? "high" : item.quantity > 5 ? "medium" : "low",
    }));
    setCustomers(mappedRows);
    setLoading(false);
  }, [rows]);

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    const _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const decreaseQuantity = useCallback(
    (params: any) => {
      setTimeout(() => {
        dispatch(decreaseCartItem(cartItems, params));
      });
    },
    [cartItems, dispatch]
  );
  useEffect(() => {
    setDisabled(false);
  }, [cartCounter]);

  const renderHeader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          gap: "10px",
        }}
      >
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
      </Box>
    );
  };
  const categoryLabelBodyTemplate = (rowData: MappedCartCategory) => {
    const categoryLabel = rowData.categoryLabel;
    return <Typography>{categoryLabel.name}</Typography>;
  };

  const titleBodyTemplate = (rowData: MappedCartCategory) => {
    return (
      <Typography
        sx={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          px: "5px",
        }}
      >
        {rowData.title}
      </Typography>
    );
  };

  const descriptionBodyTemplate = (rowData: MappedCartCategory) => {
    const description = rowData.description;
    return <Typography className="tow-lines">{description}</Typography>;
  };

  const categoryLabelFilterTemplate = (options: any) => {
    return (
      <React.Fragment>
        <Box className="mb-3 font-bold">{t("table.category_picker")}</Box>
        <MultiSelect
          value={options.value}
          options={categoryLabels}
          itemTemplate={categoryLabelItemTemplate}
          onChange={(e: any) => options.filterCallback(e.value)}
          optionLabel="name"
          placeholder={t("table.all")}
          className="p-column-filter"
        />
      </React.Fragment>
    );
  };

  const categoryLabelItemTemplate = (option: Option) => {
    console.log("ooooooooo=", option);
    return (
      <Box>
        <img
          alt={option.name}
          src={`images/avatar/${option.image}`}
          onError={(e: any) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width={32}
          style={{ verticalAlign: "middle" }}
        />
        <Typography className="image-text">{option.name}</Typography>
      </Box>
    );
  };

  const dateBodyTemplate = (rowData: MappedCartCategory) => {
    // console.log("formatDate(rowData.date)====", formatDate(rowData.date));
    // return formatDate(rowData.date);
    return "";
  };

  const dateFilterTemplate = (options: any) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e: any) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const priceBodyTemplate = (rowData: MappedCartCategory) => {
    return (
      <Typography color="primary.light" sx={{ textAlign: "center" }}>{`${
        rowData.quantity || ""
      } * ${formatCurrency(rowData.price) || ""}`}</Typography>
    );
  };
  const quentityBodyTemplate = (rowData: MappedCartCategory) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          placeItems: "center",
        }}
      >
        <Tooltip title="Decrease">
          <Button
            disabled={disabled}
            icon="pi pi-minus"
            rounded
            text
            aria-label="Decrease"
            severity="success"
            onClick={() => {
              if (rowData.quantity === 1) setDisabled(true);
              setTimeout(
                () => decreaseQuantity(rowData),
                rowData.quantity > 1 ? 0 : 2000
              );
            }}
          />
        </Tooltip>
        <Typography color="secondary.main">
          {` ${rowData.quantity} `}
        </Typography>
        <Tooltip title="Increase">
          <Button
            disabled={disabled}
            icon="pi pi-plus"
            rounded
            text
            aria-label="Increase"
            severity="success"
            onClick={() =>
              dispatch(
                addToCart(cartItems, {
                  ...rowData,
                  categoryLabel: rowData.categoryLabel.name,
                })
              )
            }
          />
        </Tooltip>
      </Box>
    );
  };

  const priceFilterTemplate = (options: any) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e: any) => options.filterCallback(e.value, options.index)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };
  const quentityFilterTemplate = (options: any) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e: any) => options.filterCallback(e.value, options.index)}
        mode="decimal"
      />
    );
  };

  const getSeverity = (status: string) => {
    switch (status) {
      case "low":
        return "warning";

      case "medium":
        return "info";

      case "high":
        return "success";
    }
  };

  const statusBodyTemplate = (rowData: MappedCartCategory) => {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
      </Box>
    );
  };

  const statusItemTemplate = (item: string) => {
    return <Tag value={item} severity={getSeverity(item)} />;
  };

  const activityBodyTemplate = (rowData: MappedCartCategory) => {
    // return (
    //   <ProgressBar value={rowData.activity} showValue={false}></ProgressBar>
    // );
    return "";
  };

  const activityFilterTemplate = (options: any) => {
    return (
      <React.Fragment>
        <Slider
          value={options.value}
          onChange={(e: any) => options.filterCallback(e.value)}
          range
          className="m-3"
        ></Slider>
        <div className="flex align-items-center justify-content-between px-2">
          <span>{options.value ? options.value[0] : 0}</span>
          <span>{options.value ? options.value[1] : 100}</span>
        </div>
      </React.Fragment>
    );
  };

  const representativeRowFilterTemplate = (options: any) => {
    return (
      <MultiSelect
        value={options.value}
        options={categoryLabels}
        itemTemplate={categoryLabelItemTemplate}
        onChange={(e: any) => options.filterApplyCallback(e.value)}
        optionLabel="name"
        placeholder="Any"
        className="p-column-filter"
        maxSelectedLabels={1}
      />
    );
  };

  const statusRowFilterTemplate = (options: any) => {
    return (
      <React.Fragment>
        <Box className="mb-3 font-bold">{t("table.category_picker")}</Box>
        <Dropdown
          value={options.value}
          options={statuses}
          onChange={(e: any) => options.filterApplyCallback(e.value)}
          itemTemplate={statusItemTemplate}
          placeholder="Select a Status"
          className="p-column-filter"
          showClear
        />
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData: MappedCartCategory) => {
    return (
      <Tooltip title="Remove">
        <Button
          disabled={disabled}
          icon="pi pi-times"
          rounded
          text
          aria-label="Decrease"
          severity="success"
          onClick={() =>
            setTimeout(() =>
              dispatch(
                removeFromCart(cartItems, {
                  ...rowData,
                  categoryLabel: rowData.categoryLabel.name,
                })
              )
            )
          }
        />
      </Tooltip>
    );
  };

  const header = renderHeader();
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  return (
    <Box>
      <Box
        sx={{
          "& .p-datatable-table": {
            thead: {
              th: {
                backgroundColor: "#eeeeee",
                color: "primary.light",
                "& path": {
                  color: "secondary.main",
                },
              },
            },
          },
        }}
      >
        <DataTable
          value={customers}
          className="p-datatable-customers"
          header={header}
          showGridlines
          stripedRows
          sortMode="multiple"
          ////
          sortField="price"
          sortOrder={-1}
          //
          removableSort
          paginator
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[2, 10, 25, 50]}
          currentPageReportTemplate={t("table.repeat_template")}
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          size="normal"
          dataKey="id"
          rowHover
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          // responsiveLayout="scroll"
          globalFilterFields={[
            "categoryLabel",
            "title",
            "description",
            "price",
            "status",
          ]}
          emptyMessage={t("table.no_items")}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3em" }}
          ></Column>
          <Column
            header={t("checkout.product_label")}
            sortable
            sortField="categoryLabel"
            filterField="categoryLabel"
            showFilterMatchModes={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
            filter
            filterElement={categoryLabelFilterTemplate}
            body={categoryLabelBodyTemplate}
          />

          <Column
            field="title"
            header={t("checkout.title")}
            sortable
            filter
            filterField="title"
            filterPlaceholder="Search by product title"
            body={titleBodyTemplate}
            style={{ maxWidth: "200px", overflow: "hidden" }}
          />

          {/* <Column
            field="date"
            header="Date"
            sortable
            filterField="date"
            dataType="date"
            style={{ minWidth: "8rem" }}
            body={dateBodyTemplate}
            filter
            filterElement={dateFilterTemplate}
          /> */}
          <Column
            field="price"
            header={t("checkout.price")}
            sortable
            dataType="numeric"
            style={{ minWidth: "8rem" }}
            body={priceBodyTemplate}
            filter
            filterElement={priceFilterTemplate}
          />
          <Column
            field="Quentity"
            header={t("checkout.quantity")}
            sortable
            dataType="numeric"
            style={{ maxWidth: "200px" }}
            body={quentityBodyTemplate}
            filter
            filterElement={quentityFilterTemplate}
          />
          <Column
            field="status"
            header="Status"
            sortable
            filterMenuStyle={{ width: "14rem" }}
            style={{ maxWidth: "150px" }}
            body={statusBodyTemplate}
            filter
            filterElement={statusRowFilterTemplate}
          />
          {/* <Column
            field="activity"
            header="Activity"
            sortable
            showFilterMatchModes={false}
            style={{ minWidth: "10rem" }}
            body={activityBodyTemplate}
            filter
            filterElement={activityFilterTemplate}
          /> */}

          <Column
            field="description"
            header={t("checkout.description")}
            sortable
            sortField="description"
            filter
            filterField="description"
            filterPlaceholder="Search by product description"
            body={descriptionBodyTemplate}
            style={{ maxWidth: "100%", overflow: "hidden" }}
          />
          <Column
            header={t("table.actions")}
            headerStyle={{ width: "4rem", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
            body={actionBodyTemplate}
          />
        </DataTable>
      </Box>
    </Box>
  );
};
