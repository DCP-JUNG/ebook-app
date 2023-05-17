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
                Oups ! La page que vous cherchez est introuvable.
            </Typography>
            <Typography variant="body1" gutterBottom>
                La page peut avoir été supprimée, renommée ou est temporairement indisponible.
            </Typography>
            <Button variant="contained" component={RouterLink} to="/">
                Retour à la page principale
            </Button>
        </Box>
      );
};

export default NotFound;