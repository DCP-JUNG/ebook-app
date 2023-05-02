import { Link } from 'react-router-dom';
import customRouteProvider from '../../utils/CustomRouteProvider';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, PaperProps } from '@mui/material';


interface LeftMenuProps {
    width: number;
    appBarHeight: number;
};

const LeftMenu = ({width, appBarHeight}: LeftMenuProps) => {

    const menuItems = customRouteProvider.map((route, index) =>
        <Link key={`link-${index}`} to={route.link}>
            <ListItem key={`list-item-${index}`} disablePadding>
                <ListItemButton key={`list-button-${index}`}>
                    <ListItemIcon key={`list-icon-${index}`}>
                        {route.icon}
                    </ListItemIcon>
                    <ListItemText key={`list-text-${index}`} primary={route.label} />
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