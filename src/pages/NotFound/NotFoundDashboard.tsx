import { Box, Link, Typography } from "@mui/material";
import { Link as RouterDomLink } from "react-router-dom";
import { ColoredDevider } from "shared";

const NotFoundDashboard=()=>{
return (
    <Box
      sx={{
        margin: "40px auto auto",
        maxWidth: "600px",
        boxShadow: "5px 5px 10px #ccc",
        ":hover": { boxShadow: "10px 10px 20px #ccc" },
        textAlign: "center",
        paddingBottom: "10px",
      }}
    >
        <Typography variant="h2" color="initial">404</Typography>
        <Typography variant="h4" color="initial">PAGE NOT FOUND</Typography>
        <ColoredDevider/>
        <Link component={RouterDomLink} to='/' sx={{textDecoration:'none'}}>Home Page</Link>
    </Box>
)
}
export default NotFoundDashboard;