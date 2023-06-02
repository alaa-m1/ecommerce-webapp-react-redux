import { Box, IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro";
import { useContext } from "react";
import { CartCategory } from "types";
import { ShoppingCartContext } from "utils/context/shoppingCartContext";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const useCheckoutColumn = (): GridColDef[] => {
  const { addToCart, decreaseCartItem, removeFromCart } =
    useContext(ShoppingCartContext);
  return [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "categoryLabel",
      headerName: "Category Label",
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
          <Box sx={{ display: "flex", justifyContent: "center",placeItems:"center" }}>
            <IconButton onClick={() => setTimeout(()=>{decreaseCartItem(params.row)}) }>
              <RemoveIcon />
            </IconButton>
            {` ${params.row.quantity} `}
            <IconButton onClick={() => {addToCart(params.row)}}>
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
            <IconButton onClick={() =>  setTimeout(()=>removeFromCart(params.row))}>
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
