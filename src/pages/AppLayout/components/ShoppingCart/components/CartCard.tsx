import { Box, IconButton } from "@mui/material";
import { forwardRef, memo, useEffect, useMemo, useState } from "react";
import { CartCategory } from "types";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { removeFromCart } from "store/shoppingCart/shoppingCartActions";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";

type CartCardProps = {
  cartItemInfo: CartCategory;
  isUpdated: boolean;
};

export const CartCard = memo(
  forwardRef(function ({ cartItemInfo, isUpdated }: CartCardProps, ref: any) {
    const dispatch = useDispatch();
    const { cartItems } = useAppSelector(selectShoopingCartItemsDetails);

    const [changeColor, setChangeColor] = useState<boolean>(true);
    useEffect(() => {
      setChangeColor(true);
      const timer = setTimeout(() => setChangeColor(false), 1000);
      return () => clearTimeout(timer);
    }, [cartItemInfo.quantity]);

    const handleDeleteItem = () =>
      dispatch(removeFromCart(cartItems, cartItemInfo));

    const imagePath: string = useMemo(
      () =>
        cartItemInfo.imagePath.includes("https")
          ? cartItemInfo.imagePath
          : `${window.location.origin}/images/categories/${cartItemInfo.categoryLabel}/${cartItemInfo.imagePath}`,
      [cartItemInfo.categoryLabel, cartItemInfo.imagePath]
    );

    return (
      <Box
        className="cart-card"
        ref={ref}
        sx={{ backgroundColor: changeColor && isUpdated ? "#ddd" : "#fff" }}
      >
        <Box className="cart-card-img">
          <img
            style={{ height: "50px" }}
            src={imagePath}
            alt={`${cartItemInfo.categoryLabel}`}
            loading="lazy"
          />
        </Box>
        <Box className="cart-card-info">
          <Box>
            <span style={{display:"inline-block", width:"110px", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cartItemInfo.title}</span>
            <br />
            <span>
              {cartItemInfo.quantity}x ${cartItemInfo.price}
            </span>
          </Box>
          <IconButton onClick={handleDeleteItem}>
            <ClearIcon />
          </IconButton>
        </Box>
      </Box>
    );
  })
);
