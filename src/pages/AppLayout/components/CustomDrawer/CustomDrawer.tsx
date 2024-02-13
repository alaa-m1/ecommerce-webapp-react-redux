import Drawer from "@mui/material/Drawer";
import { IconButton, Box, Typography, ListItemButton } from "@mui/material";
import React, { MouseEvent, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import Logo from "assets/images/logo";
import { MappedLinkInfo } from "types";
import { signOutUser } from "utils/firebase";
import { UserInfo } from "firebase/auth";
import { StyledList } from "./components";
import { useTranslation } from "react-i18next";

type CustomDrawerProps = {
  links: Array<MappedLinkInfo>;
  isSmallScreen: boolean;
  currentUser: null | UserInfo;
  handleCloseLnaguageMenu: (e: MouseEvent<HTMLDivElement>) => void;
};

export const CustomDrawer = ({
  links,
  isSmallScreen,
  currentUser,
  handleCloseLnaguageMenu,
}: CustomDrawerProps) => {
  const [open, setOpen] = useState(false);
  const drawerLinks: Array<MappedLinkInfo> = [
    ...links,
    { path: "", label: "", protected: false, id: "0" },
  ];
  const { t } = useTranslation();
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
            sx={{ width: "180px" }}
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
              sx={{ width: "100%", maxWidth: 360 }}
              aria-labelledby="nested-list-subheader"
            >
              {drawerLinks.map((link) => {
                if (link.label !== "")
                  return link.protected ? (
                    currentUser && (
                      <ListItemButton
                        key={link.id}
                        onClick={() => setOpen(false)}
                      >
                        <Link style={{ width: "100%" }} to={link.path}>
                          <Typography sx={{ color: "primary.main" }}>
                            {t(link.label)}
                          </Typography>
                        </Link>
                      </ListItemButton>
                    )
                  ) : (
                    <ListItemButton
                      key={link.id}
                      onClick={() => setOpen(false)}
                    >
                      <Link style={{ width: "100%" }} to={link.path}>
                        <Typography sx={{ color: "primary.main" }}>
                          {t(link.label)}
                        </Typography>
                      </Link>
                    </ListItemButton>
                  );
                return <div key={link.id}>&nbsp;</div>;
              })}
              <ListItemButton
                onClick={handleCloseLnaguageMenu}
                className="language-menu-btn"
              >
                <Typography sx={{ color: "primary.main" }}>
                  {t("languages.language")}
                </Typography>
              </ListItemButton>

              {currentUser ? (
                <ListItemButton
                  onClick={() => {
                    signOutUser();
                    setOpen(false);
                  }}
                >
                  <Link style={{ width: "100%" }} to={"/auth"}>
                    <Typography sx={{ color: "primary.main" }}>
                      {t("auth.signout")}
                    </Typography>
                  </Link>
                </ListItemButton>
              ) : (
                <ListItemButton onClick={() => setOpen(false)}>
                  <Link style={{ width: "100%" }} to={"/auth"}>
                    <Typography sx={{ color: "primary.main" }}>
                      {t("auth.signin")}
                    </Typography>
                  </Link>
                </ListItemButton>
              )}
            </StyledList>
          </Drawer>
        </>
      ) : null}
    </>
  );
};
