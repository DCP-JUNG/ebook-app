import { Box } from '@mui/material';
import React from 'react';

interface Textbox {
    children: React.ReactNode;
}

const Textbox = ({children}: Textbox) => {
    return (
        <Box
            component="span"
            sx={{
            display: 'block',
            p: 1,
            m: 1,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
            color: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
            border: '1px solid',
            borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: '700',
            }}
        >
        {children}
      </Box>
    );
};

export default Textbox;