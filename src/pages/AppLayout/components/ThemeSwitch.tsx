import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch } from "react-redux";
import { useAppSelector } from "utils/redux/hooks";
import { setCurrentThemeMode } from "store/user/userActions";
import { useTheme } from "@mui/material";

export const ThemeSwitch = () => {
  const currentThemeMode = useAppSelector((state) => state.user.themeMode);
  const dispatch = useDispatch();
  const theme= useTheme();
  return (
    <IconButton
      sx={{
        ml: 1,
        "& path": { color: currentThemeMode === "dark" ? theme.palette.secondary.main : theme.palette.primary.light },
      }}
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
    </IconButton>
  );
};
