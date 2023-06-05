import { Box, AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Fragment } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "assets/images/logo";
import { LinkInfo } from "types";
import { StyledLink } from "shared";
import CustomDrawer from "./CustomDrawer";
import { signOutUser } from "utils/firebase";
import ShoppingCart from "components/ShoppingCart";
import ShoppingCartLogo from "components/shoppingCartLogo";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartStatus } from "store/shoppingCart/shoppingCartSelector";
import { setShowCart } from "store/shoppingCart/shoppingCartActions";
import { useDispatch } from "react-redux";
type NavigationProps = {
  links: Array<LinkInfo>;
};

const AppLayout = ({ links }: NavigationProps) => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const currentUser =useAppSelector((state)=>state.user.currentUser);
  const  isCartOpen  = useAppSelector(selectShoopingCartStatus);
  const dispatch=useDispatch();
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
                onClick={() => dispatch(setShowCart(!isCartOpen))}
              >
                <ShoppingCartLogo/>
              </Box>
            </>
          )}
          <CustomDrawer links={links} isSmallScreen={isSmallScreen} currentUser={currentUser}/>
        </Toolbar>
      </AppBar>
      {isCartOpen && <ShoppingCart />}
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};
export default AppLayout;
