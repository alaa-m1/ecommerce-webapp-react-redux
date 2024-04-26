import React, { MouseEvent } from "react";
import {
  ListItemIcon,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemButtonBaseProps,
  ListItemTextProps,
  styled,
} from "@mui/material";
import { Link, LinkProps } from "react-router-dom";
import { isEmpty } from "lodash";

type ListLinkProps = Omit<LinkProps, "onClick"> &
  Omit<ListItemButtonBaseProps, "onClick"> & {
    isActive: boolean;
    icon?: React.ReactNode;
    hideIcon?: boolean;
    label: string;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  };
export const ListLink = ({
  isActive,
  icon,
  hideIcon = false,
  label,
  onClick,
  ...props
}: ListLinkProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        {...props}
        onClick={(e) => {
          if (isEmpty(props.to)) {
            e.preventDefault();
          }
          onClick?.(e);
        }}
        sx={{
          "& span": {
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
        {!hideIcon && icon && (
          <ListItemIcon sx={{ color: "primary.main" }}>{icon}</ListItemIcon>
        )}

        <StyledListItemText
          isActive={isActive}
          primary={label}
          sx={{ color: "primary.main" }}
        />
      </ListItemButton>
    </ListItem>
  );
};

type StyledListItemTextProps = ListItemTextProps & { isActive: boolean };
const StyledListItemText = styled(ListItemText)<StyledListItemTextProps>(
  ({ isActive }) => ({
    "& span": {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: "none",
    },
  })
);
