import React, { MouseEvent, useState } from "react";
import Drawer from "@mui/material/Drawer";
import {
  IconButton,
  Box,
  Typography,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link as ReactRouterLink } from "react-router-dom";
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

type CustomDrawerProps = {
  links: Array<MappedLinkInfo>;
  isSmallScreen: boolean;
  currentUser: null | UserInfo;
  handleCloseLnaguageMenu: (e: MouseEvent<HTMLDivElement>) => void;
};

const drawerWidth = "180px";

export const CustomDrawer = ({
  links,
  isSmallScreen,
  currentUser,
  handleCloseLnaguageMenu,
}: CustomDrawerProps) => {

  const [open, setOpen] = useState(false);
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
                      <ListItem disablePadding alignItems="flex-start">
                        <ListItemButton
                          key={link.id}
                          onClick={() => setOpen(false)}
                          sx={{ color: "primary.main" }}
                          disableGutters
                        >
                          <ListItemIcon sx={{ color: "inherit" }}>
                            {link.icon}
                          </ListItemIcon>
                          <Link component={ReactRouterLink} to={link.path}>
                            <ListItemText
                              primary={t(link.label)}
                              sx={{ color: "primary.main" }}
                            />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                    )
                  ) : (
                    <ListItem disablePadding alignItems="flex-start">
                      <ListItemButton
                        key={link.id}
                        onClick={() => setOpen(false)}
                        sx={{ color: "primary.main" }}
                        disableGutters
                      >
                        <ListItemIcon sx={{ color: "inherit" }}>
                          {link.icon}
                        </ListItemIcon>
                        <Link component={ReactRouterLink} to={link.path}>
                          <ListItemText
                            primary={t(link.label)}
                            sx={{ color: "primary.main" }}
                          />
                        </Link>
                      </ListItemButton>
                    </ListItem>
                  );
                return <div key={link.id}>&nbsp;</div>;
              })}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleCloseLnaguageMenu}
                  className="language-menu-btn"
                  sx={{ color: "primary.main" }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={t("languages.language")}
                    sx={{ color: "primary.main" }}
                  />
                </ListItemButton>
              </ListItem>
              {currentUser ? (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      signOutUser();
                      setOpen(false);
                    }}
                    sx={{ color: "primary.main" }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    <Link component={ReactRouterLink} to={"/auth"}>
                      <ListItemText
                        primary={t("auth.signout")}
                        sx={{ color: "primary.main" }}
                      />
                    </Link>
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => setOpen(false)}
                    sx={{ color: "primary.main" }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <LoginIcon />
                    </ListItemIcon>
                    <Link component={ReactRouterLink} to={"/auth"}>
                      <ListItemText
                        primary={t("auth.signin")}
                        sx={{ color: "primary.main" }}
                      />
                    </Link>
                  </ListItemButton>
                </ListItem>
              )}
            </StyledList>
          </Drawer>
        </>
      ) : null}
    </>
  );
};
