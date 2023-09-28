import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";

export const Footer = () => {
  return (
    <Box className="footer-section" sx={{ backgroundColor: "secondary.light" }}>
      <Box>
        <Link to={"/"}>
          <Typography color="primary.main">E-commerce</Typography>
        </Link>
      </Box>
      <Box sx={{ display: "flex" }}>
        <EmailIcon sx={{"& path":{color:"primary.main"}}}/>

        <a href="mailto:alaa85a@gmail.com">
          <Typography color="primary.main">alaa85a@gmail.com</Typography>
        </a>
      </Box>
    </Box>
  );
};
