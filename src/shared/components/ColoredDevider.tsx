import { Box } from "@mui/material";
const ColoredDevider = () => {
  return (
    <Box
      sx={{
        width: "90%",
        backgroundImage:
          "linear-gradient(90deg, rgba(0,255,63,1) 0%, rgba(18,9,121,1) 50%, rgba(0,255,63,1) 100%)",
        height: "2px",
        margin: "7px auto",
        boxSizing: "border-box",
      }}
    ></Box>
  );
};

export { ColoredDevider };
