import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartFooter=()=>{
    const navigate=useNavigate();
    return (
    <Box>
        <Button variant="contained" onClick={()=>navigate({pathname:'/checkout'})}>Checkout</Button>
    </Box>
)
}
export default CartFooter;