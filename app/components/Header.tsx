import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import PrimaryButton from './PrimaryButton';
import Link from 'next/link';

interface HeaderProps {
  onClick: () => void;
  className?: string;
  linkUrl: string;
  linkText: string;
}

const Header: React.FC<HeaderProps> = ({ onClick, className, linkUrl, linkText }) => {
  return (
    <>
      <Grid item xs={12} className={className} py={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Grid item xs={6} display="flex" justifyContent="flex-start">
            <PrimaryButton
              text="Get A New Random Joke"
              onClick={onClick}
              variant="contained"
              color="primary"
            />
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="flex-end">
            <Link
              href={linkUrl}
              target="_blank"
              rel="noreferrer"
            >
              {linkText}
            </Link>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default Header;
