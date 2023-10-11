import { Alert, Box } from "@mui/material";
import { DetailedHTMLProps, InputHTMLAttributes, useId, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {clsx} from "clsx";

type TextFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  icon: JSX.Element;
  register: any;
  errors: any;
  getValues: any;
};
export const TextField = ({
  name,
  label,
  icon,
  register,
  getValues,
  errors,
  type,
  ...props
}: TextFieldProps) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const handleOnShowIconClick = () => {
    setShowPassword((p) => !p);
  };
  const labelShrinkStyle: React.CSSProperties = { top: "-15px", left: "5px" };
  const labelStyle: React.CSSProperties =
    getValues(name) && getValues(name).length > 0
      ? labelShrinkStyle
      : { top: "10px", left: "30px" };
  return (
    <Box
      sx={{
        width: "auto",
        padding: "0px",
        margin: "10px 0px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "auto",
          textAlign: "left",
          ">input:focus": {
            borderWidth: "1px",
            borderColor: "#ccc",
            outlineColor: "#ccc",
            "~label": {
              top: "-15px !important",
              left: "5px !important",
              transition: "top 0.2s, left 0.2s",
            },
          },
        }}
        className={clsx({"error-border" :errors})}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "4px",
            left: "5px",
            svg: { padding: "0px", margin: "0px 0px 3px 5px" },
          }}
        >
          {icon}
        </Box>
        <input
          id={`input-${id}`}
          type={showPassword ? "text" : type}
          name={name}
          {...register(name)}
          className="custom-input"
          {...props}
          style={{
            padding: "8px 5px 8px 30px",
            margin: "5px",
            borderWidth: "1px",
            borderColor: errors ? "#d32f2f" : "#ccc",
            borderRadius: "6px",
            width: "100%",
            boxSizing: "border-box",
          }}
          placeholder=""
        />
        <label
          htmlFor={`input-${id}`}
          style={{ position: "absolute", marginLeft: "5px", ...labelStyle }}
        >
          {label}
        </label>
        {(name === "password" || name === "confirmPassword") && (
          <Box
            sx={{
              position: "absolute",
              bottom: "4px",
              right: errors ? "35px" : "10px",
              svg: {
                padding: "0px",
                margin: "0px 0px 3px 5px",
              },
            }}
          >
            {showPassword ? (
              <VisibilityIcon onClick={handleOnShowIconClick} />
            ) : (
              <VisibilityOffIcon onClick={handleOnShowIconClick} />
            )}
          </Box>
        )}
        {errors && (
          <Box
            sx={{
              position: "absolute",
              bottom: "4px",
              right: "10px",
              svg: {
                padding: "0px",
                margin: "0px 0px 3px 5px",
                color: "#d32f2f",
              },
            }}
          >
            <ErrorIcon />
          </Box>
        )}
      </Box>
      {errors && (
        <Alert
          severity="error"
          style={{
            backgroundColor: "#FDEDED",
          }}
        >
          {errors}
        </Alert>
      )}
    </Box>
  );
};
