import {
  Box,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import React, {
  MouseEvent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "assets/images/logo";
import { MappedLinkInfo } from "types";
import { LoadingSpinner } from "shared";
import {
  CustomDrawer,
  Footer,
  ShoppingCart,
  ShoppingCartLogo,
  ThemeSwitch,
  MenuBar,
} from "./components";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartStatus } from "store/shoppingCart/shoppingCartSelector";
import { setShowCart } from "store/shoppingCart/shoppingCartActions";
import { useDispatch } from "react-redux";
import { MenuBarSkeleton } from "shared/loadingSkeleton";
import { LanguageMenu2 } from "./components/LanguageMenu/LanguageMenu2";

type NavigationProps = {
  links: Array<MappedLinkInfo>;
};

const AppLayout = ({ links }: NavigationProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [isScrolling, setIsScrolling] = useState(false);
  const currentUser = null;
  const isCartOpen = useAppSelector(selectShoopingCartStatus);
  const dispatch = useDispatch();

  const shoppingCartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setShowCart(false));
  }, [dispatch]);

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
      if (scrollPosition > 90 && isScrolling === false) setIsScrolling(true);

      if (scrollPosition < 90 && isScrolling === true) setIsScrolling(false);
    };
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [isScrolling]);

  const handleLanguageMenuClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleOnLnaguageMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
      data-testid="AppLayout-div"
    >
      <ShoppingCart
        open={isCartOpen}
        anchorEl={shoppingCartRef.current}
        handleClose={handleClose}
        isScrolling={isScrolling}
      />
      <Suspense fallback={null}>
        <LanguageMenu2
          anchorEl={anchorEl}
          handleClose={handleOnLnaguageMenuClose}
        />
      </Suspense>
      <Box
        className="navigator-main-container"
        sx={{ flexGrow: 0, color: "secondary.dark" }}
      >
        <AppBar
          className="navigator-container"
          sx={{
            position: "relative",
            paddingRight: "0px !important",
            paddingLeft: "0px !important",
            overflowX: "hidden",
          }}
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
                <Suspense fallback={<MenuBarSkeleton />}>
                  <MenuBar
                    links={links}
                    handleToggleLanguageMenu={handleLanguageMenuClick}
                  />
                </Suspense>
              </>
            )}
            <Suspense fallback={null}>
              <CustomDrawer
                links={links}
                isSmallScreen={isSmallScreen}
                currentUser={currentUser}
                handleToggleLanguageMenu={handleLanguageMenuClick}
              />
            </Suspense>
            <Box
              className="shopping-cart-logo"
              onClick={() => dispatch(setShowCart(!isCartOpen))}
              ref={shoppingCartRef}
              data-testid="AppLayout-link-shoppingCart"
            >
              <ShoppingCartLogo />
            </Box>
            <ThemeSwitch />
          </Toolbar>
        </AppBar>
      </Box>
      <main style={{ flexGrow: 1, overflowX: "auto", display: "flex" }}>
        <Container disableGutters maxWidth={false}>
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
      <Box sx={{ flexGrow: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default AppLayout;
