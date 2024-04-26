import React, { MouseEvent, useState } from "react";
import Drawer from "@mui/material/Drawer";
import {
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useLocation } from "react-router-dom";
import Logo from "assets/images/logo";
import { MappedLinkInfo } from "types";
import { signOutUser } from "utils/firebase";
import { UserInfo } from "firebase/auth";
import { StyledList } from "./components";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useAppSelector } from "utils/redux/hooks";
import { ListLink } from "shared";

type CustomDrawerProps = {
  links: Array<MappedLinkInfo>;
  isSmallScreen: boolean;
  currentUser: null | UserInfo;
  handleToggleLanguageMenu: (
    e: MouseEvent<HTMLAnchorElement>
  ) => void;
};

const drawerWidth = "180px";

export const CustomDrawer = ({
  links,
  isSmallScreen,
  currentUser,
  handleToggleLanguageMenu,
}: CustomDrawerProps) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const drawerLinks: Array<MappedLinkInfo> = [
    ...links,
    { path: "", label: "", protected: false, id: "0", icon: null },
  ];
  const { t } = useTranslation();
  const currentDocDirection = useAppSelector((state) => state.user.direction);
  return (
    <>
      {isSmallScreen ? (
        <>
          <IconButton
            aria-label="Open menu drawer"
            onClick={() => setOpen(true)}
          >
            <MenuOutlinedIcon></MenuOutlinedIcon>
          </IconButton>

          <Drawer
            sx={{
              width: drawerWidth,
              "& .MuiListItemIcon-root": {
                minWidth: "auto",
                marginRight: "5px",
              },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            SlideProps={{
              direction: currentDocDirection === "rtl" ? "left" : "right",
            }}
            open={open}
            anchor="left"
            onClose={() => setOpen(false)}
            PaperProps={{ sx: { backgroundColor: "secondary.light" } }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ marginTop: "5px", color: "#fff" }}>
                <Logo />
              </Typography>
            </Box>
            <StyledList
              sx={{ width: "100%", maxWidth: 360, pl: 1 }}
              aria-labelledby="nested-list-subheader"
              disablePadding
            >
              {drawerLinks.map((link) => {
                if (link.label !== "")
                  return link.protected ? (
                    currentUser && (
                      <ListLink
                        isActive={pathname === link.path}
                        data-testid={`AppLayout-link-${link.label}`}
                        key={link.id}
                        to={link.path}
                        onClick={() => setOpen(false)}
                        label={t(link.label)}
                        icon={link.icon}
                        disableGutters
                      />
                    )
                  ) : (
                    <ListLink
                      isActive={pathname === link.path}
                      data-testid={`AppLayout-link-${link.label}`}
                      key={link.id}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      label={t(link.label)}
                      icon={link.icon}
                      disableGutters
                    />
                  );
                return <div key={link.id}>&nbsp;</div>;
              })}
              <ListLink
                isActive={false}
                className="language-menu-btn"
                data-testid={`AppLayout-link-language`}
                to={""}
                onClick={(e) => handleToggleLanguageMenu(e)}
                label={t("languages.language")}
                icon={<LanguageIcon />}
              />
              {currentUser ? (
                <ListLink
                  isActive={false}
                  data-testid={`AppLayout-link-signout`}
                  to={""}
                  onClick={() => {
                    signOutUser();
                    setOpen(false);
                  }}
                  label={t("auth.signout")}
                  icon={<LogoutIcon />}
                />
              ) : (
                <ListLink
                  isActive={pathname === "/auth"}
                  data-testid={`AppLayout-link-signin`}
                  to={"/auth"}
                  onClick={() => setOpen(false)}
                  label={t("auth.signin")}
                  icon={<LoginIcon />}
                />
              )}
            </StyledList>
          </Drawer>
        </>
      ) : null}
    </>
  );
};
