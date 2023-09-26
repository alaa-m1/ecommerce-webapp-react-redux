import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import EmailIcon from '@mui/icons-material/Email';

export const Footer = () => {
    return (
        <Box className="footer-section">
            <Box>
                <Link to={"/"}>
                E-commerce
                </Link>
            </Box>
            <Box sx={{display:"flex"}}><EmailIcon/> <a href="mailto:alaa85a@gmail.com">alaa85a@gmail.com</a></Box>
        </Box>
    )
}