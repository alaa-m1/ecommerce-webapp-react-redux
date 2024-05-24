import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch } from "react-redux";
import { useAppSelector } from "utils/redux/hooks";
import { setCurrentThemeMode } from "store/user/userActions";
import { styled, IconButtonProps } from "@mui/material";

export const ThemeSwitch = () => {
  const currentThemeMode = useAppSelector((state) => state.user.themeMode);
  const dispatch = useDispatch();
  return (
    <StyledIconButton
      themeMode={currentThemeMode}
      onClick={() =>
        dispatch(
          setCurrentThemeMode(currentThemeMode === "dark" ? "light" : "dark")
        )
      }
    >
      {currentThemeMode === "dark" ? (
        <Brightness7Icon sx={{ "& path": { color: "warning.main" } }} />
      ) : (
        <Brightness4Icon />
      )}
    </StyledIconButton>
  );
};
type StyledIconButtonType = IconButtonProps & {
  themeMode: "light" | "dark";
};

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "docDirection" && prop !== "themeMode",
})<StyledIconButtonType>(({ theme, themeMode }) => ({
  cursor: "pointer",
  "& path": {
    color:
      themeMode === "dark"
        ? theme.palette.secondary.main
        : theme.palette.primary.light,

    transition: theme.transitions.create([" color", "transform"], {
      duration: theme.transitions.duration.standard,
    }),
  },

  ml: 1,
  "&:hover": {
    "& path": {
      color: "#e76712",
    },
    transform: "scale(1.02)",
  },
}));
