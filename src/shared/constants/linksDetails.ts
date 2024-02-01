import { LinkInfo } from "types";

export const linksDetails: Array<LinkInfo> = [
  { label: "home", path: "/", protected: false },
  {
    label: "classic_collection",
    path: "/classic-collection",
    protected: false,
  },
  { label: "modern_collection", path: "/modern-collection", protected: false },
  { label: "settings", path: "/user-settings", protected: true },
];
