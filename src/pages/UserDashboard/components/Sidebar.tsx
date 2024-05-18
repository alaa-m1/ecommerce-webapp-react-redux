import React from "react";
import { AdminLogo } from "./AdminLogo";
import { SideBarLinkInfo, UserDetails } from "types";
import { useSearchParams } from "react-router-dom";
import { StyledLink, sideBarLinks } from "shared";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton } from "@mui/material";

type CustomDrawerProps = {
  fullWidth: boolean;
  isSmallScreen: boolean;
  onCloseSideBar: (value: boolean) => void;
  userInfo: UserDetails | null;
};

export const Sidebar = ({
  fullWidth,
  isSmallScreen,
  onCloseSideBar,
  userInfo,
}: CustomDrawerProps) => {
  const drawerLinks: Array<SideBarLinkInfo> = [
    ...sideBarLinks,
    { path: "", label: "", icon: null },
  ];
  const [searchParams] = useSearchParams();
  return isSmallScreen ? (
    <aside
      style={{
        flexGrow: fullWidth ? "1" : "0",
        display: "flex",
        marginRight: "4px",
        borderRadius: "5px",
        backgroundColor: "#aaa",
        boxShadow: "1px 1px 2px 2px #ddd",
        transition: "all 0.3s ease-in",
      }}
      className={
        fullWidth ? "sidebar-transform-active" : "sidebar-transform-inactive"
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          width: "100%",
        }}
      >
        <Box sx={{ "& path": { color: "white !important" } }}>
          <IconButton
            id="toggle-sidebar"
            aria-label="toggle sidebar menu"
            onClick={() => onCloseSideBar(!fullWidth)}
            sx={{ marginTop: "4px" }}
          >
            {fullWidth ? <ArrowForwardIos /> : <ArrowBackIosNew />}
          </IconButton>
        </Box>
        {fullWidth && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <Box sx={{ "& div": { width: "auto" } }}>
              <AdminLogo
                imgSrc={userInfo?.image}
                name={userInfo?.displayName}
                verticalAlignment
                isLoading={status === "loading"}
              />
            </Box>
            {drawerLinks.map((link, index) => {
              if (link.label !== "")
                return (
                  <Box
                    sx={{
                      width: "100%",
                      "& a": { display: "inline-block", width: "100%" },
                    }}
                    key={index}
                  >
                    <StyledLink
                      to={`/user-dashboard?p=${link.path}`}
                      style={{ width: "100%", padding: "8px 16px" }}
                      isActive={
                        searchParams.get("p") === link.path
                      }
                    >
                      {link.label}
                    </StyledLink>
                  </Box>
                );
              return <div key={index}>&nbsp;</div>;
            })}
          </Box>
        )}
      </Box>
    </aside>
  ) : (
    <nav
      style={{
        display: "flex",
        height: "auto",
        padding: "2px",
        backgroundColor: "#aaa",
        borderRadius: "5px",
        margin: "4px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          flexGrow: "1",
          width: "100%",
          gap: "10px",
          margin: "4px",
          padding: "0px 5px",
        }}
      >
        {drawerLinks.map((link, index) => {
          if (link.label !== "")
            return (
              <StyledLink
                key={index}
                to={`/user-dashboard?p=${link.path}`}
                isActive={
                  searchParams.get("p") === link.path
                }
              >
                {link.label}
              </StyledLink>
            );
          return null;
        })}
      </ul>
      <AdminLogo
        imgSrc={userInfo?.image}
        name={userInfo?.displayName}
        isLoading={status === "loading"}
      />
    </nav>
  );
};
