import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Product } from "types";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFromCart } from "store/shoppingCart/shoppingCartActions";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { GridCloseIcon } from "@mui/x-data-grid";

type ProductCardProps = {
  productDetails: Product | null;
  onRemove: () => void;
};
export const ProductCard = ({ productDetails, onRemove }: ProductCardProps) => {
  const dispatch = useDispatch();
  const { cartItems } = useAppSelector(selectShoopingCartItemsDetails);
  const imagePath = useMemo(() => {
    const path = productDetails?.imagePath;
    if (productDetails && path) {
      return path.includes("https")
        ? productDetails.imagePath
        : `${window.location.origin}/images/categories/${productDetails.categoryLabel}/${productDetails.imagePath}`;
    }
  }, [productDetails]);

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      {productDetails && (
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={imagePath} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {productDetails.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {productDetails.description}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
               {productDetails.description}
              </Typography> */}
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    setTimeout(() =>
                      dispatch(removeFromCart(cartItems, productDetails))
                    );
                    onRemove();
                  }}
                  startIcon={<GridCloseIcon
                    sx={{ "& path": { color: "secondary.main" } }}
                  />}
                >Remove</Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                ${productDetails.price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
