import { Menu, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
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
    >
      <MenuItem
        selected={activatedLanguage === "en"}
        onClick={() => {
          i18n.changeLanguage("en");
          handleClose();
        }}
      >
        {t("languages.english")}
      </MenuItem>
      <MenuItem
        selected={activatedLanguage === "de"}
        onClick={() => {
          i18n.changeLanguage("de");
          handleClose();
        }}
      >
        {t("languages.german")}
      </MenuItem>
    </Menu>
  );
};

type LanguageMenuProps = {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
};
