import { Box, AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "assets/images/logo";
import { LinkInfo } from "types";
import { StyledLink } from "shared";
import CustomDrawer from "./CustomDrawer";
import { UserContext } from "utils/context/userContext";
import { signOutUser } from "utils/firebase";
import ShoppingCart from "components/ShoppingCart";
import ShoppingCartLogo from "assets/images/shoppingCartLogo";

type NavigationProps = {
  links: Array<LinkInfo>;
};

const AppLayout = ({ links }: NavigationProps) => {
  const [showShopingCart, setShowShopingCart] = useState(false);
  const { pathname } = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { currentUser } = useContext(UserContext);
  return (
    <Fragment>
      <AppBar className="navigator-container" sx={{ position: "relative" }}>
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
                {currentUser ? (
                  <Box className="auth-links" onClick={() => signOutUser()}>
                    <StyledLink
                      to="auth"
                      isactive={pathname === "/auth" ? "active" : "inActive"}
                    >
                      Sign Out
                    </StyledLink>
                  </Box>
                ) : (
                  <Box className="auth-links">
                    <StyledLink
                      to="auth"
                      isactive={pathname === "/auth" ? "active" : "inActive"}
                    >
                      Sign In
                    </StyledLink>
                  </Box>
                )}
              </Box>
              <Box
                className="shopping-cart-logo"
                onClick={() => setShowShopingCart((p) => !p)}
              >
                <ShoppingCartLogo counter={0} />
              </Box>
            </>
          )}
          <CustomDrawer links={links} isSmallScreen={isSmallScreen} />
        </Toolbar>
      </AppBar>
      {showShopingCart && <ShoppingCart />}
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};
export default AppLayout;
