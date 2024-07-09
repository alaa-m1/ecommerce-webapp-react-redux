import React, {
  MouseEvent,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import IconButton from "@mui/material/IconButton";
import { useAppSelector } from "utils/redux/hooks";
import { ThemeMode } from "store/user/userReducer";
import { styled, IconButtonProps, Tooltip } from "@mui/material";
import { ThemeMenu } from "./ThemeMenu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import { useTranslation } from "react-i18next";

type ThemeSwitchProps = {
  showTooltip?: boolean;
};
export const ThemeSwitch = ({ showTooltip = false }: ThemeSwitchProps) => {
  const { t } = useTranslation();
  const themeMode = useAppSelector((state) => state.user.themeMode);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleThemeMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleOnThemeMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOnThemeMenuClose);
    return () => {
      window.removeEventListener("scroll", handleOnThemeMenuClose);
    };
  }, []);
  const themeButton = useMemo(
    () => (
      <StyledIconButton themeMode={themeMode} onClick={handleThemeMenuClick}>
        {themeMode === "dark" ? (
          <DarkModeIcon sx={{ "& path": { color: "warning.main" } }} />
        ) : themeMode === "light" ? (
          <LightModeIcon />
        ) : (
          <DisplaySettingsIcon />
        )}
      </StyledIconButton>
    ),
    [themeMode]
  );
  return (
    <>
      <Suspense fallback={null}>
        <ThemeMenu anchorEl={anchorEl} handleClose={handleOnThemeMenuClose} />
      </Suspense>
      {showTooltip ? (
        <Tooltip
          title={
            themeMode === "dark"
              ? t("theme.dark")
              : themeMode === "light"
              ? t("theme.light")
              : t("theme.system")
          }
        >
          {themeButton}
        </Tooltip>
      ) : (
        <>{themeButton}</>
      )}
    </>
  );
};
type StyledIconButtonType = IconButtonProps & {
  themeMode: ThemeMode;
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
