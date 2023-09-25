import { Box, AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "assets/images/logo";
import { LinkInfo } from "types";
import { StyledLink } from "shared";
import { signOutUser } from "utils/firebase";
import { CustomDrawer, Footer, ShoppingCart, ShoppingCartLogo } from "./components";
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
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const isCartOpen = useAppSelector(selectShoopingCartStatus);
  const dispatch = useDispatch();

  const shoppingCartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setShowCart(false));
  }, []);

  const handleClose = (event: Event) => {
    if (
      shoppingCartRef.current?.contains(event?.target as HTMLElement) ||
      (event?.target as HTMLElement)?.id === "shopping-add-btn"
    ) {
      return;
    }
    dispatch(setShowCart(false));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
      <Box sx={{ flexGrow: 0 }}>
        <AppBar
          className="navigator-container"
          sx={{ position: "relative", paddingRight: "0px !important" }}
        >
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
                  onClick={(e) => dispatch(setShowCart(!isCartOpen))}
                  ref={shoppingCartRef}
                >
                  <ShoppingCartLogo />
                </Box>
              </>
            )}
            <CustomDrawer
              links={links}
              isSmallScreen={isSmallScreen}
              currentUser={currentUser}
            />
          </Toolbar>
        </AppBar>
        <ShoppingCart
          open={isCartOpen}
          anchorEl={shoppingCartRef.current}
          handleClose={handleClose}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <main>
          <Outlet />
        </main>
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default AppLayout;