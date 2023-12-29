import { Typography, useTheme } from "@mui/material";
import * as React from "react";
import { selectShoopingCartItemsDetails } from "store/shoppingCart/shoppingCartSelector";
import { useAppSelector } from "utils/redux/hooks";
export const ShoppingCartLogo = (props) => {
  const { cartCounter } = useAppSelector(selectShoopingCartItemsDetails);
  const currentThemeMode = useAppSelector((state) => state.user.themeMode);
  const theme = useTheme();
  return (
    <>
      <svg
        fill="#000000"
        width="32px"
        height="32px"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        style={{ fill: currentThemeMode === "dark" ? theme.palette.secondary.main : theme.palette.primary.light }}
      >
        <path d="M879.941 90.236l-53.688 501.453c-.682 6.396-7.192 12.246-13.623 12.246H283.683c-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48H812.63c27.367 0 51.449-21.64 54.351-48.854l53.687-501.444c1.204-11.247-6.937-21.34-18.183-22.544s-21.34 6.937-22.544 18.183z" />
        <path d="M835.011 731.761H327.23c-6.532 0-13.272-5.979-14.052-12.469L237.463 89.95c-1.351-11.23-11.55-19.238-22.78-17.887s-19.238 11.55-17.887 22.78l75.715 629.34c3.254 27.071 27.456 48.539 54.719 48.539h507.781c11.311 0 20.48-9.169 20.48-20.48s-9.169-20.48-20.48-20.48z" />
        <path d="M216.68 71.68h-93.798c-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48h93.798c11.311 0 20.48-9.169 20.48-20.48s-9.169-20.48-20.48-20.48zm204.887 790.78c0-27.478-22.278-49.756-49.756-49.756-27.475 0-49.746 22.275-49.746 49.756s22.27 49.756 49.746 49.756c27.478 0 49.756-22.278 49.756-49.756zm40.96 0c0 50.1-40.616 90.716-90.716 90.716-50.099 0-90.706-40.615-90.706-90.716s40.607-90.716 90.706-90.716c50.1 0 90.716 40.616 90.716 90.716zm352.004 0c0-27.478-22.278-49.756-49.756-49.756-27.475 0-49.746 22.275-49.746 49.756s22.27 49.756 49.746 49.756c27.478 0 49.756-22.278 49.756-49.756zm40.96 0c0 50.1-40.616 90.716-90.716 90.716-50.099 0-90.706-40.615-90.706-90.716s40.607-90.716 90.706-90.716c50.1 0 90.716 40.616 90.716 90.716z" />
      </svg>
      <Typography
        component="span"
        color="primary.main"
        className="shopping-cart-logo-counter"
        style={{ display: "inline-block", paddingBottom: "10px" }}
        fontSize={14}
      >
        {cartCounter}
      </Typography>
    </>
  );
};
