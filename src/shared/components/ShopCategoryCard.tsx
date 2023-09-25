import { Box, Button } from "@mui/material";
import { memo, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addToCart, setShowCart } from "store/shoppingCart/shoppingCartActions";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { setActiveCartId, setActiveCartIndex } from "store/shoppingState/shoppingStateActions";
import { Product } from "types";
import { useAppSelector } from "utils/redux/hooks";

type ShopCategoryCardProps = {
  catInfo: Product;
};
export const ShopCategoryCard = memo(
  ({ catInfo }: ShopCategoryCardProps) => {
    const { cartItems } = useAppSelector(selectShoopingCartItemsDetails);
    const dispatch = useDispatch();

    const handleAddToCart = useCallback(() => {
      dispatch(addToCart(cartItems, catInfo));
      dispatch(setShowCart(true));
      const activeCartIndex=cartItems.findIndex((item)=>item.id===catInfo.id)
      dispatch(setActiveCartIndex(activeCartIndex))
      dispatch(setActiveCartId(catInfo.id))
    },[cartItems, catInfo]);

    const imagePath: string = useMemo(
      () =>
      catInfo.imagePath.includes("https")
          ? catInfo.imagePath
          : `${window.location.origin}/images/categories/${catInfo.categoryLabel}/${catInfo.imagePath}`,
      [catInfo.categoryLabel, catInfo.imagePath]
    );
    return (
      <Box className="shop-category-card">
        <Box className="shop-category-images">
          <img src={imagePath} alt={`${catInfo.categoryLabel}`} loading="lazy" />
        </Box>
        <Box className="shopping-btn">
          <Button
            id="shopping-add-btn"
            variant="contained"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
        <Box className="shop-category-info">{catInfo.price}</Box>
      </Box>
    );
  }
);
