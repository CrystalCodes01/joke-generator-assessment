import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface PrimaryButtonProps extends ButtonProps {
  text: string;
  padding?: string;
  borderRadius?: string;
}

// Reusable Button Component
const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  variant,
  onClick,
  text,
  color,
  padding,
  borderRadius,
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      color={color}
      sx={{
        padding: {
          xs: ".75rem", 
          md: padding, 
        },
        borderRadius,
      }}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
