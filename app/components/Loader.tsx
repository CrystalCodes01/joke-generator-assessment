import React from 'react';
import { Box, Typography } from '@mui/material';

interface LoaderProps {
  text: string;
}

// Reusable Loading Component
// this could be expanded upon with more props to use throughout the application
// ie: a boolean prop that could be passed to allow for text with a spinner or icon {hasSpinner=true, showIcon=true}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <Box textAlign="center">
      <Typography fontWeight="bold">{text}</Typography>
    </Box>
  );
};

export default Loader;
