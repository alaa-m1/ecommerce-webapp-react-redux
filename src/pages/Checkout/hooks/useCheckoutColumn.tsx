import { Box, IconButton, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
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
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useCheckoutColumn = (): GridColDef[] => {
  const { cartItems } = useAppSelector(selectShoopingCartItemsDetails);
  const { cartCounter } = useAppSelector(selectShoopingCartItemsDetails);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const decreaseQuantity = useCallback(
    (params: GridRenderCellParams<CartCategory>) => {
      setTimeout(() => {
        dispatch(decreaseCartItem(cartItems, params.row));
      });
    },
    [cartItems, dispatch]
  );
  useEffect(() => {
    setDisabled(false);
  }, [cartCounter]);
  return [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "categoryLabel",
      headerName: t("checkout.product_label"),
      width: 150,
    },
    {
      field: "title",
      headerName: t("checkout.title"),
      width: 150,
    },
    {
      field: "price",
      headerName: t("checkout.price"),
      width: 110,
      renderCell: (params: GridRenderCellParams<CartCategory>) => {
        return (
          <Typography color="primary.light">{`${params.row.quantity || ""} * $${
            params.row.price || ""
          }`}</Typography>
        );
      },
    },

    {
      field: "Quentity",
      headerName: t("checkout.quantity"),
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
            <IconButton
              disabled={disabled}
              onClick={() => {
                if (params.row.quantity === 1) setDisabled(true);
                setTimeout(
                  () => decreaseQuantity(params),
                  params.row.quantity > 1 ? 0 : 2000
                );
              }}
            >
              <RemoveIcon sx={{ "& path": { color: "secondary.main" } }} />
            </IconButton>
            <Typography color="secondary.main">
              {` ${params.row.quantity} `}
            </Typography>
            <IconButton
              onClick={() => dispatch(addToCart(cartItems, params.row))}
            >
              <AddIcon sx={{ "& path": { color: "secondary.main" } }} />
            </IconButton>
          </Box>
        );
      },
    },
    {
      field: "",
      headerName: t("checkout.remove"),
      sortable: false,
      width: 100,
      renderCell: (params: GridRenderCellParams<CartCategory>) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              onClick={() =>
                setTimeout(() =>
                  dispatch(removeFromCart(cartItems, params.row))
                )
              }
            >
              <CloseIcon sx={{ "& path": { color: "secondary.main" } }} />
            </IconButton>
          </Box>
        );
      },
    },
    {
      field: "description",
      headerName: t("checkout.description"),
      sortable: false,
      flex: 1,
    },
  ];
};
