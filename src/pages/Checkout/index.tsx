import { Box } from "@mui/material";
import { DataGridPro, GridSlotsComponentsProps } from "@mui/x-data-grid-pro";
import { useContext } from "react";
import { ShoppingCartContext } from "utils/context/shoppingCartContext";
import { useCheckoutColumn } from "./hooks";

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    cartTotal: number;
  }
}
export function CustomFooterStatusComponent(
  props: NonNullable<GridSlotsComponentsProps["footer"]>
) {
  return (
    <Box sx={{ p: 1, display: "flex" }}>Total {`$${props.cartTotal}`}</Box>
  );
}

const Checkout = () => {
  const { cartTotal } = useContext(ShoppingCartContext);
  const columns = useCheckoutColumn();
  const { cartItems } = useContext(ShoppingCartContext);
  return (
    <>
    <h2 style={{textAlign:"center", textTransform:"capitalize", color:"#00f"}}>Checkout your order</h2>

    <Box>
      <DataGridPro
        rows={cartItems}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        slots={{
          footer: CustomFooterStatusComponent,
        }}
        slotProps={{
          footer: { cartTotal },
        }}
      />
    </Box>
    </>
  );
};
export default Checkout;
