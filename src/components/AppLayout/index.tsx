import { Box, AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Fragment } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "assets/images/logo";
import { LinkInfo } from "types";
import { StyledLink } from "shared";
import CustomDrawer from "./CustomDrawer";

type NavigationProps = {
  links: Array<LinkInfo>;
};

const AppLayout = ({ links }: NavigationProps) => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Fragment>
      <AppBar className="navigator-container" sx={{position: "relative"}}>
        <Toolbar>
          {isSmallScreen ? (
            <Box className="logo-container">
              <Link to="/">
                <Logo />
              </Link>
            </Box>
          ) : (
            <>
              <Box className="logo-container">
                <Link to="/">
                  <Logo />
                </Link>
              </Box>
              <Box className="link-container">
                <Box className="general-links">
                  {links.map((link, index) => (
                    <StyledLink
                      key={index}
                      to={link.path}
                      isactive={pathname === link.path ? "active" : "inActive"}
                    >
                      {link.label}
                    </StyledLink>
                  ))}
                </Box>
                <Box className="auth-links">
                  <StyledLink
                    to="auth"
                    isactive={pathname === "/auth" ? "active" : "inActive"}
                  >
                    Login
                  </StyledLink>
                </Box>
              </Box>
            </>
          )}
          <CustomDrawer links={links} isSmallScreen={isSmallScreen} />
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};
export default AppLayout;
