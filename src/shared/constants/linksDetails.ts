import { LinkInfo, SideBarLinkInfo } from "types";

export const linksDetails: Array<LinkInfo> = [
  { label: "home", path: "/", protected: false },
  {
    label: "classic_collection",
    path: "/classic-collection",
    protected: false,
  },
  { label: "modern_collection", path: "/modern-collection", protected: false },
  { label: "dashboard", path: "/user-dashboard", protected: true },
  { label: "about", path: "/about", protected: false },
];


export const sideBarLinks: Array<SideBarLinkInfo> = [
  { label: "Profile", path: "profile" },
  { label: "settings", path: "settings" },
];