import { Box } from "@mui/material";
import { forwardRef, memo, useEffect, useState } from "react";
import { CartCategory } from "types";

type CartCardProps = {
  cartItemInfo: CartCategory;
  isUpdated: boolean;
};

const CartCard = memo(
  forwardRef(function ({ cartItemInfo,isUpdated }: CartCardProps, ref: any) {

    const [changeColor,setChangeColor]=useState<boolean>(true);
    useEffect(()=>{
      setChangeColor(true)
      const timer=setTimeout(()=>setChangeColor(false),1000)
      return ()=>clearTimeout(timer)
    },[cartItemInfo.quantity])
    return (
      <Box className="cart-card" ref={ref} sx={{backgroundColor:changeColor && isUpdated?"#ddd":"#fff"}}>
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
  })
);

export default CartCard;
