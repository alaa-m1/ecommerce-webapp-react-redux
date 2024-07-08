import { useAppSelector } from "utils/redux/hooks";

const useGetUIThemeMode = () => {
  const themeMode = useAppSelector((state) => state.user.themeMode);
  if (themeMode === "system") {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      return "dark";
    } else {
      return "light";
    }
  } else return themeMode;
};
export default useGetUIThemeMode;
