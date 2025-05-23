import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  styled,
} from "@mui/material";
import i18next from "i18next";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setDocumentDirection } from "store/user/userActions";
import { useAppSelector } from "utils/redux/hooks";

type UILanguage = "en" | "de" | "ar";
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

  const docDirection = useAppSelector((state) => state.user.direction);

  const [cookieConsent] = useCookies(["cookieConsent"]);
  const language = (i18next.language as UILanguage) || "en";
  const canSaveCookies = !!cookieConsent.cookieConsent;

  useLayoutEffect(() => {
    if (canSaveCookies) {
      if (docDirection && language) {
        if (docDirection === "ltr") {
          i18n.changeLanguage(language);
          handleChangeToLTR();
        } else {
          i18n.changeLanguage(language);
          handleChangeToRTL();
        }
      } else {
        i18n.changeLanguage("en");
        handleChangeToLTR();
      }
    }
  }, []);

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
                id="language-menu"
                aria-labelledby="language-button"
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
