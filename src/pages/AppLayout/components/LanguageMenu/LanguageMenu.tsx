import { Menu, MenuItem, Typography } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setDocumentDirection } from "store/user/userActions";
import { useAppSelector } from "utils/redux/hooks";
import i18next from "i18next";

type UILanguage = "en" | "de" | "ar";
export const LanguageMenu = ({ anchorEl, handleClose }: LanguageMenuProps) => {
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

  const docDirection = useAppSelector((state) => state.user.direction);
  // const uiLanguage = useAppSelector((state) => state.user.uiLanguage);

  // const [cookies, setCookie] = useCookies(["language"]);
  const language = (i18next.language as UILanguage) || "en";

  useLayoutEffect(() => {
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
      // setCookie("language", language, { path: "/", maxAge: 31536000 });
      handleChangeToLTR();
    }
  }, []);

  return (
    <Menu
      id="language-menu-popper"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      sx={{ "& .MuiList-root": { backgroundColor: "secondary.light" } }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "secondary.light",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem
        selected={activatedLanguage === "en"}
        onClick={() => {
          i18n.changeLanguage("en");
          handleChangeToLTR();
        }}
        data-testid="AppLayout-LanguageMenu-menuItem-en"
      >
        <Typography color="primary.main">{t("languages.english")}</Typography>
      </MenuItem>
      <MenuItem
        selected={activatedLanguage === "de"}
        onClick={() => {
          i18n.changeLanguage("de");
          handleChangeToLTR();
        }}
        data-testid="AppLayout-LanguageMenu-menuItem-de"
      >
        <Typography color="primary.main">{t("languages.german")}</Typography>
      </MenuItem>
      <MenuItem
        selected={activatedLanguage === "ar"}
        onClick={() => {
          i18n.changeLanguage("ar");
          handleChangeToRTL();
        }}
        data-testid="AppLayout-LanguageMenu-menuItem-ar"
      >
        <Typography color="primary.main">{t("languages.arabic")}</Typography>
      </MenuItem>
    </Menu>
  );
};

type LanguageMenuProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
};
