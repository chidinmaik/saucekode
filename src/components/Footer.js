import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#FFA500',
         textAlign: 'center',
        width: '100%',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} saucekode All rights reserved.
      </Typography>
      <Box mt={2}>
        <Link href="/" color="inherit" sx={{ mx: 1 }}>
         Twitter
        </Link>
        <Link href="https://github.com/chidinmaik" color="#000fff" sx={{ mx: 1 }}>
         github
        </Link>
        <Link href="/" color="inherit" sx={{ mx: 1 }}>
          Contact Us
        </Link>
        <Typography variant="body2" color="textSecondary">
       Built in boredoom by  <Link href="wa.me/08133282698" color="inherit" sx={{ mx: 1 }}>
          chidinma
        </Link>    </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
