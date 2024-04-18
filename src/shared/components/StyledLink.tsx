import React from "react";
import { Box, ListItemIcon, Typography } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";
import { isEmpty } from "lodash";

type LinkComponentProps = LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    isactive: "active" | "inActive";
    children: React.ReactNode;
    icon?: React.ReactNode;
    hideIcon?: boolean;
  };
const LinkComponent = ({
  children,
  icon,
  hideIcon = false,
  ...props
}: LinkComponentProps) => {
  return (
    <Link
      {...props}
      style={{
        display: "inline-block",
        pointerEvents: `${isEmpty(props.to) ? "none" : "auto"}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent:"end" }}>
        {!hideIcon && icon && (
          <Box sx={{ color: "primary.main" }}>{icon}</Box>
        )}
        <Typography
          component="span"
          color="primary.main"
          sx={{
            fontSize: 14,
            fontWeight: props.isactive === "active" ? "bold" : "normal",
          }}
        >
          {children}
        </Typography>
      </Box>
    </Link>
  );
};
const StyledLink = styled(LinkComponent)`
  font-weight: ${(p) => (p.isactive === "active" ? "bold" : "normal")};
  text-decoration: none;
`;

export { StyledLink };
