import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import CustomAppBar from '../CustomAppBar/CustomAppBar';
import LeftMenu from '../LeftMenu/LeftMenu';
import Content from '../Content/Content';
import customRouteProvider from '../../utils/CustomRouteProvider';

const DashboardLayout = () => {

    const maxLeftMenuWidth = 250;
    const minLeftMenuWidth = 70;
    const appBarHeight = 70;

    const [currentLeftMenuWidth, setCurrentLeftMenuWidth] = useState(maxLeftMenuWidth);
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(true);

    const onLeftMenuBtnClick = () => {
        const newWidth = isLeftMenuOpen ? minLeftMenuWidth : maxLeftMenuWidth;
        const isOpen = !isLeftMenuOpen;

        setCurrentLeftMenuWidth(newWidth);
        setIsLeftMenuOpen(isOpen);
    };

    const routes = customRouteProvider.map((route, index) => 
        <Route key={index} path={route.routeProps.path} element={<Content drawerWidth={currentLeftMenuWidth} appBarHeight={appBarHeight} title={route.pageTitle} children={route.routeProps.element} />} />   
    );

    return (
        <>
            <CustomAppBar isLeftMenuOpen={isLeftMenuOpen} height={appBarHeight} onMenuBtnClck={onLeftMenuBtnClick}/>
            <LeftMenu width={currentLeftMenuWidth} appBarHeight={appBarHeight}/>
            <Routes>
                {routes}
            </Routes>
        </>
    );
};

export default DashboardLayout;