import { Box, Link, Typography } from "@mui/material";
import { Link as RouterDomLink } from "react-router-dom";
import { ColoredDevider } from "shared";

const NotFoundDashboard=()=>{
return (
    <Box
      sx={{
        margin: "40px auto auto",
        maxWidth: "600px",
        boxShadow: "5px 5px 10px",
        ":hover": { boxShadow: "10px 10px 20px" },
        textAlign: "center",
        paddingBottom: "10px",
        color:"secondary.dark"
      }}
      data-testid="NotFound-div"
    >
        <Typography fontSize="16px" color="primary.light">404</Typography>
        <Typography color="primary.light">PAGE NOT FOUND</Typography>
        <ColoredDevider/>
        <Link component={RouterDomLink} to='/' sx={{textDecoration:'none', color:"secondary.main"}}>Home Page</Link>
    </Box>
)
}
export default NotFoundDashboard;