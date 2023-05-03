import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

const NotFound = () => {
    return (
        <Box textAlign="center">
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                Oops! The page you are looking for cannot be found.
            </Typography>
            <Typography variant="body1" gutterBottom>
                The page may have been removed, renamed, or is temporarily unavailable.
            </Typography>
            <Button variant="contained" component={RouterLink} to="/">
                Go back to home
            </Button>
        </Box>
      );
};

export default NotFound;