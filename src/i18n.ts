import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["de", "en", "ar"],
    fallbackLng: "en",
    detection: {
      // We only care about the cookie
      order: ["cookie"],
      // If `lookupCookie` is not set, it will use `i18next` as the cookie name
      // lookupCookie: LANGUAGE_COOKIE,
      // This will automatically update the cookie
      caches: ["cookie"], // Stores the language selection in a cookie
      cookieOptions: {
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
      },
    },
    debug: true,
  });
export default i18n;
