import { Box, Typography } from '@mui/material';
import React from 'react';

interface ContentProps {
    marginLeft: number;
    title: string;
    children: JSX.Element;
}

const Content = ({marginLeft, title, children}: ContentProps) => {
    return (
        <Box>
            <Typography variant="h6">{title}</Typography>
            {children}
        </Box>
    );
};

export default Content;