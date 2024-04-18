import React, { MouseEvent, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MappedLinkInfo } from "types";
import { useDispatch } from "react-redux";
import { User, UserInfo, onAuthStateChanged } from "firebase/auth";
import {
  auth,
  createUserDocFromAuth,
  getUserDocFromAuth,
  signOutUser,
} from "utils/firebase";
import { setCurrentUser } from "store/user/userActions";
import { fetchCategoriesAsync } from "store/localProducts/localProductsActions";
import { StyledLink } from "shared";
import { useAppSelector } from "utils/redux/hooks";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

type MenuBarProps = {
  links: Array<MappedLinkInfo>;
  handleCloseLnaguageMenu: (e: MouseEvent<HTMLDivElement>) => void;
};
export const MenuBar = ({ links, handleCloseLnaguageMenu }: MenuBarProps) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        createUserDocFromAuth(user);
        getUserDocFromAuth(user);
      }
      if (user) {
        const userInfo: UserInfo = {
          displayName: (user as User).displayName,
          email: (user as User).email,
          phoneNumber: (user as User).phoneNumber,
          photoURL: (user as User).photoURL,
          providerId: (user as User).providerId,
          uid: (user as User).uid,
        };
        dispatch(setCurrentUser(userInfo));
      } else dispatch(setCurrentUser(null));
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategoriesAsync() as any);
  }, [dispatch]);

  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <Box
      className="link-container"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        gap: 2,
        flexGrow: 4,
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "start", flexGrow: 1, gap: 2 }}
      >
        {links.map((link) =>
          link.protected ? (
            currentUser && (
              <StyledLink
                key={link.id}
                to={link.path}
                isactive={pathname === link.path ? "active" : "inActive"}
                data-testid={`AppLayout-link-${link.label}`}
                icon={link.icon}
                hideIcon={isLargeScreen}
              >
                {t(link.label)}
              </StyledLink>
            )
          ) : (
            <StyledLink
              key={link.id}
              to={link.path}
              isactive={pathname === link.path ? "active" : "inActive"}
              data-testid={`AppLayout-link-${link.label}`}
              icon={link.icon}
              hideIcon={isLargeScreen}
            >
              {t(link.label)}
            </StyledLink>
          )
        )}
      </Box>

      <Box
        onClick={handleCloseLnaguageMenu}
        data-testid="AppLayout-link-language"
        style={{ cursor: "pointer" }}
      >
        <StyledLink
          to=""
          isactive={"inActive"}
          data-testid="AppLayout-link-signin"
          icon={<LanguageIcon />}
          hideIcon={isLargeScreen}
        >
          {t("languages.language")}
        </StyledLink>
      </Box>

      {currentUser ? (
        <Box onClick={() => signOutUser()}>
          <StyledLink
            to="auth"
            isactive={pathname === "/auth" ? "active" : "inActive"}
            data-testid="AppLayout-link-signout"
            icon={<LogoutIcon />}
            hideIcon={isLargeScreen}
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
            icon={<LoginIcon />}
            hideIcon={isLargeScreen}
          >
            {t("auth.signin")}
          </StyledLink>
        </Box>
      )}
    </Box>
  );
};
