import { Typography } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

type LinkComponentProps = LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    isactive: "active" | "inActive";
    children: React.ReactNode;
  };
const LinkComponent = ({ children, ...props }: LinkComponentProps) => {
  return (
    <Link {...props}>
      <Typography
        component="span"
        color="primary.main"
        sx={{
          fontSize: 16,
          fontWeight: props.isactive === "active" ? "bold" : "normal",
        }}
      >
        {children}
      </Typography>
    </Link>
  );
};
const StyledLink = styled(LinkComponent)`
  font-weight: ${(p) => (p.isactive === "active" ? "bold" : "normal")};
  text-decoration: none;
`;

export { StyledLink };
