import { Box } from "@mui/material";
import { CartCategory } from "types";

const CartCard = ({ cartItemInfo }: { cartItemInfo: CartCategory }) => {
  return (
    <Box className="cart-card">
      <Box className="cart-card-img">
        <img
          style={{ height: "50px" }}
          src={`${window.location.origin}/images/categories/${cartItemInfo.categoryLabel}/${cartItemInfo.categoryDetails.imagePath}`}
          alt={`${cartItemInfo.categoryLabel}`}
          loading="lazy"
        />
      </Box>
      <Box className="cart-card-info"><span>{cartItemInfo.categoryDetails.title}</span><br/><span>{cartItemInfo.quantity}x ${cartItemInfo.categoryDetails.price}</span></Box>
    </Box>
  );
};

export default CartCard;
