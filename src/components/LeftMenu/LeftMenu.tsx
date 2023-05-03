import { Link } from 'react-router-dom';
import customRouteProvider from '../../utils/CustomRouteProvider';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, PaperProps } from '@mui/material';


interface LeftMenuProps {
    width: number;
    appBarHeight: number;
};

const LeftMenu = ({width, appBarHeight}: LeftMenuProps) => {

    const menuItems = customRouteProvider.filter(route => route.isVisibleOnLeftMenu).map((route, index) =>
        <Link key={`link-${index}`} to={route.routeProps.path!}>
            <ListItem key={`list-item-${index}`} disablePadding>
                <ListItemButton key={`list-button-${index}`}>
                    <ListItemIcon key={`list-icon-${index}`}>
                        {route.menuIcon}
                    </ListItemIcon>
                    <ListItemText key={`list-text-${index}`} primary={route.menuLabel} />
                </ListItemButton>
            </ListItem>
        </Link>
    );

    const paperSx : PaperProps = {
        sx:  {
            width: width,
            marginTop: `${appBarHeight}px`
        }
    };

    return (
        <Drawer variant='permanent' PaperProps={paperSx}>
            <List>
                {menuItems}
            </List>
        </Drawer>
    );
};

export default LeftMenu;