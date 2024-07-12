import { useDispatch } from "react-redux";
import {
  ClickAwayListener,
  Grow,
  styled,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { setCurrentThemeMode } from "store/user/userActions";
import { useAppSelector } from "utils/redux/hooks";
import { ThemeMode } from "store/user/userReducer";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";

export const ThemeMenu = ({ anchorEl, handleClose }: ThemeMenuProps) => {
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const { t } = useTranslation();
  const themeMode = useAppSelector((state) => state.user.themeMode);
  const [activatedLanguage, setActivatedLanguage] =
    useState<ThemeMode>(themeMode);
  const dispatch = useDispatch();

  useEffect(() => {
    setActivatedLanguage(themeMode);
  }, [themeMode]);

  const handleChangeToLight = useCallback(() => {
    dispatch(setCurrentThemeMode("light"));
    handleClose();
  }, [dispatch, handleClose]);

  const handleChangeToDark = useCallback(() => {
    dispatch(setCurrentThemeMode("dark"));
    handleClose();
  }, [dispatch, handleClose]);

  const handleChangeToSystem = useCallback(() => {
    dispatch(setCurrentThemeMode("system"));
    handleClose();
  }, [dispatch, handleClose]);

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      handleClose();
    } else if (event.key === "Escape") {
      handleClose();
    }
  }
  return (
    <StyledPopper
      id="theme-menu-popper"
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      placement="bottom-start"
      // elevation= {0}
      transition
      disablePortal
      sx={{ position: "fixed !important" }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "left top" : "left bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="theme-menu"
                aria-labelledby="theme-button"
                onKeyDown={handleListKeyDown}
                sx={{
                  "& path": { color: "custom.sub1" },
                  "& circle": { color: "custom.sub1" },
                }}
              >
                <MenuItem
                  selected={activatedLanguage === "light"}
                  onClick={() => {
                    handleChangeToLight();
                  }}
                  data-testid="AppLayout-ThemeMenu-menuItem-en"
                >
                  <LightModeIcon />
                  <Typography color="primary.main" sx={{ ml: "5px" }}>
                    {t("theme.light")}
                  </Typography>
                </MenuItem>
                <MenuItem
                  selected={activatedLanguage === "dark"}
                  onClick={() => {
                    handleChangeToDark();
                  }}
                  data-testid="AppLayout-ThemeMenu-menuItem-de"
                >
                  <DarkModeIcon />
                  <Typography color="primary.main" sx={{ ml: "5px" }}>
                    {t("theme.dark")}
                  </Typography>
                </MenuItem>
                <MenuItem
                  selected={activatedLanguage === "system"}
                  onClick={() => {
                    handleChangeToSystem();
                  }}
                  data-testid="AppLayout-ThemeMenu-menuItem-ar"
                >
                  <DisplaySettingsIcon />
                  <Typography color="primary.main" sx={{ ml: "5px" }}>
                    {t("theme.system")}
                  </Typography>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </StyledPopper>
  );
};

type ThemeMenuProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
};

const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: "1201",
  "& .MuiList-root": { backgroundColor: theme.palette.secondary.light },
  overflow: "visible",
  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  mt: 1.5,
  "& .MuiAvatar-root": {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  "& .MuiPaper-root::before": {
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    backgroundColor: theme.palette.secondary.light,
    transform: "translateY(-50%) rotate(45deg)",
    zIndex: 1101,
  },
}));
