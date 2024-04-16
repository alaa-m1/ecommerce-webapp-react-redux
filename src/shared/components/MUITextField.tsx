import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  styled,
} from "@mui/material";
import React, { useId, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type MUITextFieldProps<T extends FieldValues> = Omit<TextFieldProps, "name"> & {
  label: string;
  name: Path<T>;
  icon: JSX.Element;
  register: UseFormRegister<T>;
  errors: string | undefined;
  watch: UseFormWatch<T>;
};
export const MUITextField = <T extends FieldValues>({
  name,
  label,
  icon,
  register,
  errors,
  ...props
}: MUITextFieldProps<T>) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const handleOnShowIconClick = () => {
    setShowPassword((p) => !p);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        width: "auto",
        padding: "0px",
        margin: "15px 0px",
      }}
    >
      <Box>
        <CustomTextField
          {...props}
          {...register(name)}
          variant="outlined"
          id={`input-${id}`}
          type={showPassword ? "text" : props.type}
          fullWidth
          error={!!errors}
          InputLabelProps={{
            // shrink: true,
          }}
          label={label}
          helperText={errors}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),

            endAdornment:
              name === "password" || name === "confirmPassword" ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleOnShowIconClick}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      </Box>
    </Box>
  );
};

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingLeft: "5px",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "medium",
  },
  "& label.Mui-focused": {
    color: theme.palette.primary.light,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },
}));
