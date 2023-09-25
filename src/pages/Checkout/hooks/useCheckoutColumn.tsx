import { Box, IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro";
import { CartCategory } from "types";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  addToCart,
  decreaseCartItem,
  removeFromCart,
} from "store/shoppingCart/shoppingCartActions";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { useDispatch } from "react-redux";
import { useCallback } from "react";

export const useCheckoutColumn = (): GridColDef[] => {
  const { cartItems } = useAppSelector(selectShoopingCartItemsDetails);
  const dispatch = useDispatch();

  const decreaseQuantity = useCallback(
    (params: GridRenderCellParams<CartCategory>) => {
      setTimeout(() => {
        dispatch(decreaseCartItem(cartItems, params.row));
      });
    },
    [cartItems, dispatch]
  );

  return [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "categoryLabel",
      headerName: "Product Label",
      width: 150,
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 110,
      renderCell: (params: GridRenderCellParams<CartCategory>) => {
        return (
          <strong>{`${params.row.quantity || ""} * $${
            params.row.price || ""
          }`}</strong>
        );
      },
    },

    {
      field: "Quentity",
      headerName: "quantity",
      sortable: false,
      width: 130,
      renderCell: (params: GridRenderCellParams<CartCategory>) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              placeItems: "center",
            }}
          >
            <IconButton onClick={() =>  setTimeout(()=> decreaseQuantity(params))}>
              <RemoveIcon />
            </IconButton>
            {` ${params.row.quantity} `}
            <IconButton
              onClick={() => dispatch(addToCart(cartItems, params.row))}
            >
              <AddIcon />
            </IconButton>
          </Box>
        );
      },
    },
    {
      field: "",
      headerName: "Remove",
      sortable: false,
      width: 100,
      renderCell: (params: GridRenderCellParams<CartCategory>) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              onClick={() =>  setTimeout(()=> dispatch(removeFromCart(cartItems, params.row)))}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      flex: 1,
    },
  ];
};
