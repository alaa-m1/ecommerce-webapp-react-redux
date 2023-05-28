import { Button, ButtonTypeMap, ExtendButtonBase } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { useLocation, useNavigate } from "react-router-dom";

type LinkButtonProps = DefaultComponentProps<ButtonTypeMap<{}, "button">> & {
  to?: string;
  query?: string;
  label: string;
};
const LinkButton = ({ to, query, label, ...props }: LinkButtonProps) => {
  const navigate = useNavigate();
  const location =useLocation();

  const pathName = location.pathname;
  return (
    <Button
      disableRipple={true}
      disableElevation={true}
      variant="text"
      color="primary"
      onClick={() => {
        if (query) {
          navigate({ pathname: to ? to : pathName, search: `p=${query}` });
        } else {
          navigate({ pathname: to ? to : pathName });
        }
      }}
      {...props}
    >
      {label}
    </Button>
  );
};

export { LinkButton };
