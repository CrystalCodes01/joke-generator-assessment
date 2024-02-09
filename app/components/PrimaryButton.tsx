import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface PrimaryButtonProps extends ButtonProps {
  text: string;
}

// Reusable Button Component
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ variant, onClick, text, color, ...rest }) => {
  return (
    <Button variant={variant} onClick={onClick} color={color} {...rest}>
      {text}
    </Button>
  );
};

export default PrimaryButton;
