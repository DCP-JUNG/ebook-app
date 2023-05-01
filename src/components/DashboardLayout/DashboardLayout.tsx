import React, { useState } from 'react';
import CustomAppBar from '../CustomAppBar/CustomAppBar';
import LeftMenu from '../LeftMenu/LeftMenu';
import Content from '../Content/Content';
import customRouteProvider from '../../utils/CustomRouteProvider';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

const DashboardLayout = () => {

    const maxLeftMenuWidth = 200;
    const minLeftMenuWidth = 70;

    const [currentLeftMenuWidth, setCurrentLeftMenuWidth] = useState(maxLeftMenuWidth);
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);

    const onLeftMenuBtnClick = () => {
        const newWidth = isLeftMenuOpen ? minLeftMenuWidth : maxLeftMenuWidth;
        const isOpen = !isLeftMenuOpen;

        setCurrentLeftMenuWidth(newWidth);
        setIsLeftMenuOpen(isOpen);
    };

    const routes = customRouteProvider.map(route => 
        <Route path={route.link} element={<Content marginLeft={currentLeftMenuWidth} title={route.pageTitle} children={route.content} />} />
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <CustomAppBar marginLeft={currentLeftMenuWidth}/>
            <LeftMenu width={currentLeftMenuWidth}/>
            <Routes>
                {routes}
            </Routes>
        </Box>
    );
};

export default DashboardLayout;