import { Alert, Box } from "@mui/material";
import React, { useId, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { clsx } from "clsx";
import styled from "styled-components";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type TextFieldProps<T extends FieldValues> =
  React.ComponentPropsWithoutRef<"input"> & {
    label: string;
    name: Path<T>;
    icon: JSX.Element;
    register: UseFormRegister<T>;
    errors: string | undefined;
    watch: UseFormWatch<T>;
  };
export const TextField = <T extends FieldValues>({
  name,
  label,
  icon,
  register,
  watch,
  errors,
  type,
  ...props
}: TextFieldProps<T>) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const handleOnShowIconClick = () => {
    setShowPassword((p) => !p);
  };
  const labelShrinkStyle: React.CSSProperties = { top: "-15px", left: "5px" };
  const labelStyle: React.CSSProperties =
    watch(name) && watch(name).length > 0
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
        className={clsx({ "error-border": errors })}
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
        <Input
          id={`input-${id}`}
          type={showPassword ? "text" : type}
          {...register(name)}
          {...props}
          errors={errors}
          placeholder=""
        />
        <Label
          errors={errors}
          htmlFor={`input-${id}`}
          style={{ position: "absolute", marginLeft: "5px", ...labelStyle }}
        >
          {label}
        </Label>
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
          data-testid="TextField-label-error"
        >
          {errors}
        </Alert>
      )}
    </Box>
  );
};

const Input = styled.input<{ errors?: string }>`
  padding: 8px 5px 8px 30px;
  margin: 5px;
  border-width: 1px;
  border-color: ${(props) => (props.errors ? "#d32f2f" : "#ccc")};
  border-radius: 6px;
  width: 100%;
  box-sizing: "border-box";
`;

const Label = styled.label<{ errors?: string }>`
  color: ${(props) => (props.errors ? "#d32f2f" : "#000")};
`;
