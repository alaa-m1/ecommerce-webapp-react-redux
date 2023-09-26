import { Box, AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
  const [isScrolling, setIsScrolling] = useState(false);
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
  useEffect(() => {
    const handleOnScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 90 && isScrolling === false)
        setIsScrolling(true)

      if (scrollPosition < 90 && isScrolling === true)
        setIsScrolling(false)
    };
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [isScrolling]);

  return (
    <Box sx={{ position: "relative", display: "flex", flexDirection: "column",minHeight:"100vh", justifyContent: "space-between" }}>
      <ShoppingCart
        open={isCartOpen}
        anchorEl={shoppingCartRef.current}
        handleClose={handleClose}
        isScrolling={isScrolling}
      />
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

              </>
            )}
            <CustomDrawer
              links={links}
              isSmallScreen={isSmallScreen}
              currentUser={currentUser}
            />
            <Box
              className="shopping-cart-logo"
              onClick={(e) => dispatch(setShowCart(!isCartOpen))}
              ref={shoppingCartRef}
            >
              <ShoppingCartLogo />
            </Box>
          </Toolbar>
        </AppBar>

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