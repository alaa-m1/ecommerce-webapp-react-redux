import {
  ClickAwayListener,
  Grow,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  styled,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setDocumentDirection } from "store/user/userActions";

export const LanguageMenu2 = ({ anchorEl, handleClose }: LanguageMenuProps) => {
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const { t, i18n } = useTranslation();
  const [activatedLanguage, setActivatedLanguage] = useState(i18n.language);
  const dispatch = useDispatch();

  useEffect(() => {
    setActivatedLanguage(i18n.language);
  }, [i18n.language]);

  const handleChangeToRTL = useCallback(() => {
    document.dir = "rtl";

    dispatch(setDocumentDirection("rtl"));
    handleClose();
  }, [dispatch, handleClose]);

  const handleChangeToLTR = useCallback(() => {
    document.dir = "ltr";
    dispatch(setDocumentDirection("ltr"));
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
      id="language-menu-popper"
      open={open}
      anchorEl={anchorEl}
      role={undefined}
      placement="bottom-start"
      // elevation= {0}
      transition
      disablePortal
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
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem
                  selected={activatedLanguage === "en"}
                  onClick={() => {
                    i18n.changeLanguage("en");
                    handleChangeToLTR();
                  }}
                  data-testid="AppLayout-LanguageMenu-menuItem-en"
                >
                  <Typography color="primary.main">
                    {t("languages.english")}
                  </Typography>
                </MenuItem>
                <MenuItem
                  selected={activatedLanguage === "de"}
                  onClick={() => {
                    i18n.changeLanguage("de");
                    handleChangeToLTR();
                  }}
                  data-testid="AppLayout-LanguageMenu-menuItem-de"
                >
                  <Typography color="primary.main">
                    {t("languages.german")}
                  </Typography>
                </MenuItem>
                <MenuItem
                  selected={activatedLanguage === "ar"}
                  onClick={() => {
                    i18n.changeLanguage("ar");
                    handleChangeToRTL();
                  }}
                  data-testid="AppLayout-LanguageMenu-menuItem-ar"
                >
                  <Typography color="primary.main">
                    {t("languages.arabic")}
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

type LanguageMenuProps = {
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
