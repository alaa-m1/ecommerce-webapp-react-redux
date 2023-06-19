import { Box } from "@mui/material";
import { memo } from "react";
import { CartCategory } from "types";

type CartCardProps = {
  cartItemInfo: CartCategory;
};

const CartCard = memo(({ cartItemInfo }: CartCardProps) => {
  return (
    <Box className="cart-card">
      <Box className="cart-card-img">
        <img
          style={{ height: "50px" }}
          src={`${window.location.origin}/images/categories/${cartItemInfo.categoryLabel}/${cartItemInfo.imagePath}`}
          alt={`${cartItemInfo.categoryLabel}`}
          loading="lazy"
        />
      </Box>
      <Box className="cart-card-info">
        <span>{cartItemInfo.title}</span>
        <br />
        <span>
          {cartItemInfo.quantity}x ${cartItemInfo.price}
        </span>
      </Box>
    </Box>
  );
});

export default CartCard;
