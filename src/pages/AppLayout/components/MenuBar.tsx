import React, { MouseEvent, useEffect } from "react";
import { Box, Typography } from "@mui/material";
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

type MenuBarProps = {
  links: Array<MappedLinkInfo>;
  handleCloseLnaguageMenu: (e: MouseEvent<HTMLDivElement>) => void;
};
export const MenuBar = ({ links, handleCloseLnaguageMenu }: MenuBarProps) => {
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
    <Box className="link-container">
      <Box>
        {links.map((link) =>
          link.protected ? (
            currentUser && (
              <StyledLink
                key={link.id}
                to={link.path}
                isactive={pathname === link.path ? "active" : "inActive"}
                data-testid={`AppLayout-link-${link.label}`}
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
            >
              {t(link.label)}
            </StyledLink>
          )
        )}
      </Box>
      <Typography
        className="language-menu-btn"
        onClick={handleCloseLnaguageMenu}
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
  );
};
