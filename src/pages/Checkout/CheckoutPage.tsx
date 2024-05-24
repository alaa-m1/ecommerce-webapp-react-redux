import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridRowParams,
  GridSlotsComponentsProps,
} from "@mui/x-data-grid";
import { useCheckoutColumn } from "./hooks";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { useTranslation } from "react-i18next";
import { PaymentForm, ProductCard } from "./components";
import { GenericDialog } from "shared";
import { Product } from "types";
import { CheckCircle } from "@mui/icons-material";
import { ProductCard2 } from "./components/ProductCard2";

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    cartTotal: number;
  }
}
export function CustomFooterStatusComponent(
  props: NonNullable<GridSlotsComponentsProps["footer"]>
) {
  const { t } = useTranslation();
  return (
    <Box sx={{ p: 1, display: "flex" }}>
      <Typography color="primary.light">
        {t("checkout.total")}:{" "}
        <Typography
          component="span"
          color="secondary.main"
        >{`€${props.cartTotal}`}</Typography>
      </Typography>
    </Box>
  );
}

const CheckoutPage = () => {
  const columns = useCheckoutColumn();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { cartItems, cartTotal } = useAppSelector(
    selectShoopingCartItemsDetails
  );
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);
  const handleRowDoubleClick = (params: GridRowParams<Product>) => {
    console.log("params=", params);
    setSelectedProduct(params.row);
    if (selectedProduct) setOpen(true);
  };
  return (
    <>
      <h2
        style={{
          textAlign: "center",
          textTransform: "capitalize",
          color: "#00f",
        }}
      >
        {t("checkout.check_your_order")}
      </h2>

      <Box>
        <DataGrid
          rows={cartItems}
          columns={columns}
          isRowSelectable={(params) => params.row !== undefined}
          autoHeight
          disableRowSelectionOnClick
          onRowDoubleClick={handleRowDoubleClick}
          slots={{
            footer: CustomFooterStatusComponent,
          }}
          slotProps={{
            footer: { cartTotal },
          }}
        />
      </Box>
      <PaymentForm />
      <GenericDialog
        open={open}
        titleOptions={{
          title: "Product details",
        }}
        contentOptions={{
          // text: text,
          content: (
            <ProductCard2
              productDetails={selectedProduct}
              onRemove={() => setOpen(false)}
            />
          ),
        }}
        actionOptions={{
          confirmBtn: { label: "OK", startIcon: <CheckCircle /> },
        }}
        onConfirm={() => setOpen(false)}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
export default CheckoutPage;
