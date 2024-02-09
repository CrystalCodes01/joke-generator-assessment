import React from 'react';
import { Box, Typography } from '@mui/material';

interface ErrorBoxProps {
  text: string;
}

// Reusable Error Component
// this could be expanded upon with more props to use throughout the application
// ie: background color, optional close button, could encapsulate warnings

const ErrorBox: React.FC<ErrorBoxProps> = ({ text }) => {
  return (
    <Box textAlign="center">
      <Typography color="error" fontWeight="bold">
        {text}
      </Typography>
    </Box>
  );
};

export default ErrorBox;
