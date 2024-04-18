import React from "react";
import { LinkInfo, SideBarLinkInfo } from "types";
import HomeIcon from "@mui/icons-material/Home";
import ChairIcon from "@mui/icons-material/Chair";
import TravelxEploreIcon from "@mui/icons-material/TravelExplore";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import InfoIcon from "@mui/icons-material/Info";

import BadgeIcon from "@mui/icons-material/Badge";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const linksDetails: Array<LinkInfo> = [
  { label: "home", path: "/", protected: false, icon: <HomeIcon /> },
  {
    label: "classic_collection",
    path: "/classic-collection",
    protected: false,
    icon: <ChairIcon />,
  },
  {
    label: "modern_collection",
    path: "/modern-collection",
    icon: <TravelxEploreIcon />,
    protected: false,
  },
  {
    label: "dashboard",
    path: "/user-dashboard",
    icon: <SpaceDashboardIcon />,
    protected: true,
  },
  { label: "about", path: "/about", icon: <InfoIcon />, protected: false },
];

export const sideBarLinks: Array<SideBarLinkInfo> = [
  { label: "Profile", path: "profile", icon: <BadgeIcon /> },
  { label: "settings", path: "settings", icon: <ManageAccountsIcon /> },
];
