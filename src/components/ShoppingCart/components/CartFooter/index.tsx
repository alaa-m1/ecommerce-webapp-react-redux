import { Box, Button, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const CartFooter=()=>{
    const navigate=useNavigate();
    return (
    <Box>
        <Button variant="contained" onClick={()=>navigate({pathname:'/checkout'})}>Checkout</Button>
    </Box>
)
}
export default CartFooter;