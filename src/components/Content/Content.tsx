import { Box, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

interface ContentProps {
    drawerWidth: number;
    appBarHeight: number;
    title: string;
    children: React.ReactNode;
}

const Content = ({drawerWidth, appBarHeight, title, children}: ContentProps) => {

    const boxSx: SxProps<Theme>  = {
        marginTop: `${appBarHeight + 10}px`,
        width: { sm:  `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
    };

    return (
        <Box sx={boxSx} >
            <Typography variant="h6">{title}</Typography>
            {children}
        </Box>
    );
};

export default Content;