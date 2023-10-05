import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch } from "react-redux";
import { useAppSelector } from "utils/redux/hooks";
import { setCurrentThemeMode } from "store/user/userActions";

export const ThemeSwitch = () => {
  const currentThemeMode = useAppSelector((state) => state.user.themeMode);
  const dispatch = useDispatch();
  return (
    <IconButton
      sx={{
        ml: 1,
        "& path": { color: currentThemeMode === "dark" ? "#ff9800" : "#000" },
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
