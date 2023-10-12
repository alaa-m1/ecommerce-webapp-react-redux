import {
  Box,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  Button,
  FormControlLabel,
  Typography,
} from "@mui/material";
import {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "assets/images/logo";
import { LinkInfo } from "types";
import { StyledLink } from "shared";
import { signOutUser } from "utils/firebase";
import {
  CustomDrawer,
  Footer,
  ShoppingCart,
  ShoppingCartLogo,
  LanguageMenu,
  ThemeSwitch
} from "./components";
import { useAppSelector } from "utils/redux/hooks";
import { selectShoopingCartStatus } from "store/shoppingCart/shoppingCartSelector";
import { setShowCart } from "store/shoppingCart/shoppingCartActions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

type NavigationProps = {
  links: Array<LinkInfo>;
};

const AppLayout = ({ links }: NavigationProps) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
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
      if (scrollPosition > 90 && isScrolling === false) setIsScrolling(true);

      if (scrollPosition < 90 && isScrolling === true) setIsScrolling(false);
    };
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [isScrolling]);

  const handleLanguageMenuClick = (
    e: MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
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
      <LanguageMenu
        anchorEl={anchorEl}
        handleClose={handleOnLnaguageMenuClose}
      />
      <Box className="navigator-main-container" sx={{ flexGrow: 0,color: "secondary.dark" }}>
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
                  <Box>
                    {links.map((link, index) => (
                      <StyledLink
                        key={index}
                        to={link.path}
                        isactive={
                          pathname === link.path ? "active" : "inActive"
                        }
                        data-testid={`AppLayout-link-${link.label}`}
                      >
                        {t(link.label)}
                      </StyledLink>
                    ))}
                  </Box>
                  <Typography
                    className="language-menu-btn"
                    onClick={handleLanguageMenuClick}
                    color="primary.main"
                    data-testid="AppLayout-link-language"
                  >
                    {t("languages.language")}
                  </Typography>

                  {currentUser ? (
                    <Box onClick={() => signOutUser()}>
                      <StyledLink
                        to="auth"
                        isactive={pathname === "/auth" ? "active" : "inActive"}
                        data-testid="AppLayout-link-signout"
                      >
                        {t("auth.signout")}
                      </StyledLink>
                    </Box>
                  ) : (
                    <Box>
                      <StyledLink
                        to="auth"
                        isactive={pathname === "/auth" ? "active" : "inActive"}
                        data-testid="AppLayout-link-signin"
                      >
                        {t("auth.signin")}
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
              handleCloseLnaguageMenu={handleLanguageMenuClick}
            />
            <Box
              className="shopping-cart-logo"
              onClick={(e) => dispatch(setShowCart(!isCartOpen))}
              ref={shoppingCartRef}
              data-testid="AppLayout-link-shoppingCart"
            >
              <ShoppingCartLogo />
            </Box>
            <ThemeSwitch />
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
