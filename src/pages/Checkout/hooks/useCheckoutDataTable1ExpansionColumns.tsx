import { Column, ColumnBodyOptions } from "primereact/column";
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";
import { formatCurrency } from "utils/helpers";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";
import {
  addToCart,
  decreaseCartItem,
  removeFromCart,
} from "store/shoppingCart/shoppingCartActions";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { InputNumber } from "primereact/inputnumber";
import { Slider } from "primereact/slider";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import { Tag } from "primereact/tag";
import {
  MappedCartCategory,
  Option,
} from "../components/CheckoutDataTableExpansion";
import {
  DataTableExpandedRows,
  DataTableValueArray,
} from "primereact/datatable";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const useCheckoutDataTable1ExpansionColumns = ({
  categoryLabels,
  expandedRows,
}: {
  categoryLabels: Option[];
  expandedRows: DataTableExpandedRows | DataTableValueArray | undefined;
}): React.ReactNode[] => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { cartItems } = useAppSelector(selectShoopingCartItemsDetails);
  const { cartCounter } = useAppSelector(selectShoopingCartItemsDetails);
  const [disabled, setDisabled] = useState(false);
  const docDirection = useAppSelector((state) => state.user.direction);
  const statuses = ["low", "medium", "high"];

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

  const allowExpansion = (rowData: MappedCartCategory) => {
    return rowData?.orders?.length > 0;
  };

  const bodyTemplate = (field: string) => {
    return (
      <Typography
        sx={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          px: "5px",
        }}
      >
        {field}
      </Typography>
    );
  };
  const twoLinesBodyTemplate = (field: string) => {
    return <Typography className="tow-lines">{field}</Typography>;
  };

  const categoryLabelFilterTemplate = useCallback(
    (options: any) => {
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
    },
    [categoryLabels, t]
  );

  const categoryLabelItemTemplate = (option: Option) => {
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
    // return formatDate(rowData.date);
    return "";
  };

  const dateFilterTemplate = useCallback((options: any) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e: any) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  }, []);

  const priceBodyTemplate = useCallback((rowData: MappedCartCategory) => {
    return (
      <Typography color="primary.light" sx={{ textAlign: "center" }}>{`${
        rowData.quantity || ""
      } * ${formatCurrency(rowData.price) || ""}`}</Typography>
    );
  }, []);
  const quentityBodyTemplate = useCallback(
    (rowData: MappedCartCategory) => {
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
    },
    [cartItems, decreaseQuantity, disabled, dispatch]
  );

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

  const statusBodyTemplate = useCallback((rowData: MappedCartCategory) => {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
      </Box>
    );
  }, []);

  const statusItemTemplate = useCallback((item: string) => {
    return <Tag value={item} severity={getSeverity(item)} />;
  }, []);

  const activityBodyTemplate = (rowData: MappedCartCategory) => {
    // return (
    //   <ProgressBar value={rowData.activity} showValue={false}></ProgressBar>
    // );
    return "";
  };

  const activityFilterTemplate = useCallback((options: any) => {
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
  }, []);

  const representativeRowFilterTemplate = useCallback(
    (options: any) => {
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
    },
    [categoryLabels]
  );

  const statusRowFilterTemplate = useCallback(
    (options: any) => {
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
    },
    [statusItemTemplate, statuses, t]
  );

  const actionBodyTemplate = useCallback(
    (rowData: MappedCartCategory) => {
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
    },
    [cartItems, disabled, dispatch]
  );

  const expansionBodyTemplate = useCallback(
    (rowData: MappedCartCategory, options: ColumnBodyOptions) => {
      const expandedRowsArr = Object.entries(expandedRows ?? {}).map(
        (item) => item[0]
      );
      return (
        <Typography
          onClick={options?.expander?.onClick}
          className={options.expander?.className}
        >
          {expandedRowsArr.includes(rowData.id.toString()) ? (
            <ExpandMoreIcon sx={{ color: "custom.label" }} />
          ) : docDirection === "ltr" ? (
            <ChevronRight sx={{ color: "custom.label" }} />
          ) : (
            <ChevronLeft sx={{ color: "custom.label" }} />
          )}
        </Typography>
      );
    },
    [docDirection, expandedRows]
  );

  return useMemo(
    () => [
      <Column
        key="0"
        expander={allowExpansion}
        style={{ width: "5rem" }}
        body={expansionBodyTemplate}
      />,
      // <Column
      //   key="1"
      //   selectionMode="single"
      //   headerStyle={{ width: "3em" }}
      // ></Column>,
      <Column
        key="2"
        header={t("checkout.product_label")}
        sortable
        sortField="categoryLabel"
        field="categoryLabel.name"
        filterField="categoryLabel"
        showFilterMatchModes={false}
        filterMenuStyle={{ width: "14rem" }}
        style={{ width: "200px" }}
        filter
        filterElement={categoryLabelFilterTemplate}
        body={(rowData: MappedCartCategory) =>
          bodyTemplate(rowData.categoryLabel.name)
        }
      />,
      <Column
        key="3"
        field="title"
        header={t("checkout.title")}
        sortable
        filter
        filterField="title"
        filterPlaceholder="Search by product title"
        body={(rowData: MappedCartCategory) => bodyTemplate(rowData.title)}
        style={{ maxWidth: "200px", overflow: "hidden" }}
      />,

      //  <Column
      //       field="date"
      //       header="Date"
      //       sortable
      //       filterField="date"
      //       dataType="date"
      //       style={{ minWidth: "8rem" }}
      //       body={dateBodyTemplate}
      //       filter
      //       filterElement={dateFilterTemplate}
      //     />

      <Column
        key="4"
        field="price"
        header={t("checkout.price")}
        sortable
        dataType="numeric"
        style={{ minWidth: "8rem" }}
        body={priceBodyTemplate}
        filter
        filterElement={priceFilterTemplate}
      />,
      <Column
        key="5"
        field="Quentity"
        header={t("checkout.quantity")}
        sortable
        dataType="numeric"
        style={{ maxWidth: "200px" }}
        body={quentityBodyTemplate}
        filter
        filterElement={quentityFilterTemplate}
      />,
      <Column
        key="6"
        field="status"
        header="Status"
        sortable
        filterMenuStyle={{ width: "14rem" }}
        style={{ maxWidth: "150px" }}
        body={statusBodyTemplate}
        filter
        filterElement={statusRowFilterTemplate}
      />,

      //  <Column
      //       field="activity"
      //       header="Activity"
      //       sortable
      //       showFilterMatchModes={false}
      //       style={{ minWidth: "10rem" }}
      //       body={activityBodyTemplate}
      //       filter
      //       filterElement={activityFilterTemplate}
      //     />

      <Column
        key="7"
        field="description"
        header={t("checkout.description")}
        sortable
        sortField="description"
        filter
        filterField="description"
        filterPlaceholder="Search by product description"
        body={(rowData: MappedCartCategory) =>
          twoLinesBodyTemplate(rowData.description)
        }
        style={{ maxWidth: "300px", overflow: "hidden" }}
      />,
      <Column
        key="8"
        header={t("table.actions")}
        headerStyle={{ width: "4rem", textAlign: "center" }}
        bodyStyle={{ textAlign: "center", overflow: "visible" }}
        body={actionBodyTemplate}
      />,
    ],
    [
      actionBodyTemplate,
      categoryLabelFilterTemplate,
      expansionBodyTemplate,
      priceBodyTemplate,
      quentityBodyTemplate,
      statusBodyTemplate,
      statusRowFilterTemplate,
      t,
    ]
  );
};
