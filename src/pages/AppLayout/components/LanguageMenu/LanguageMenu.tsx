import { Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageMenu = ({ anchorEl, handleClose }: LanguageMenuProps) => {
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const { t, i18n } = useTranslation();
  const [activatedLanguage, setActivatedLanguage] = useState(i18n.language);
  useEffect(() => {
    setActivatedLanguage(i18n.language);
  }, [i18n.language]);
  return (
    <Menu
      id="language-menu-popper"
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      sx={{"& .MuiList-root":{backgroundColor:"secondary.light"}}}
    >
      <MenuItem
        selected={activatedLanguage === "en"}
        onClick={() => {
          i18n.changeLanguage("en");
          handleClose();
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
          handleClose();
        }}
        data-testid="AppLayout-LanguageMenu-menuItem-de"
      >
        <Typography color="primary.main">
        {t("languages.german")}
        </Typography>
      </MenuItem>
    </Menu>
  );
};

type LanguageMenuProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
};
