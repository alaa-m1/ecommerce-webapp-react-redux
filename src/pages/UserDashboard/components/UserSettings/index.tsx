import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { GeneralSettings } from "./components/GeneralSettings";
import { PrivilegesSettings } from "./components/PrivilegesSettings";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";

const getTabProps = (index: number) => {
  return {
    id: `setting-tab-${index}`,
    "aria-controls": `setting-tabpanel-${index}`,
  };
};

export const UserSettings = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          // centered
          aria-label="settings tabs"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab
            icon={<SettingsIcon />}
            iconPosition="start"
            label="General"
            {...getTabProps(0)}
          />
          <Tab
            icon={<SettingsAccessibilityIcon />}
            iconPosition="start"
            label="Privileges"
            {...getTabProps(1)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        animateTransitions={false}
        onChangeIndex={handleChangeIndex}
      >
        <GeneralSettings value={value} index={0} dir={theme.direction} />
        <PrivilegesSettings value={value} index={1} dir={theme.direction} />
      </SwipeableViews>
    </Box>
  );
};
