import React, { MouseEvent } from "react";
import { Box, Link as MUILink, Typography } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";
import { isEmpty } from "lodash";

type StyledLinkProps = Omit<LinkProps, "onClick"> &
  React.RefAttributes<HTMLAnchorElement> & {
    children: React.ReactNode;
    isActive?: boolean;
    icon?: React.ReactNode;
    hideIcon?: boolean;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  };

const StyledLink = ({
  children,
  isActive = false,
  icon,
  hideIcon = false,
  onClick,
  ...props
}: StyledLinkProps) => {
  return (
    <MUILink
      component={Link}
      {...props}
      underline="none"
      onClick={(e) => {
        if (isEmpty(props.to)) {
          e.preventDefault();
        }
        onClick?.(e as React.MouseEvent<HTMLAnchorElement>);
      }}
      sx={{
        display: "inline-block",
        fontWeight: isActive ? "bold" : "normal",
        textDecoration: "none",
        "& span": {
          margin: "0px 10px",
          transition: "color 0.2s ease-in",
        },
        "& path": {
          transition: "color 0.2s ease-in",
        },
        "&:hover": {
          "& span": {
            color: "custom.hover",
          },
          "& path": {
            color: "custom.hover",
          },
        },
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      >
        {!hideIcon && icon && <Box sx={{ color: "primary.main" }}>{icon}</Box>}
        <Typography
          component="span"
          color="primary.main"
          sx={{
            fontSize: 14,
            fontWeight: isActive ? "bold" : "normal",
          }}
        >
          {children}
        </Typography>
      </Box>
    </MUILink>
  );
};
export { StyledLink };
