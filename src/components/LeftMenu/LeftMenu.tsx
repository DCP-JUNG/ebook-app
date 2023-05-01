import { Link } from 'react-router-dom';
import customRouteProvider from '../../utils/CustomRouteProvider';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, PaperProps } from '@mui/material';


interface LeftMenuProps {
    width: number;
};

const LeftMenu = ({width}: LeftMenuProps) => {

    const menuItems = customRouteProvider.map((route, index) =>
        <Link to={route.link}>
            <ListItem key={`list-item-${index}`} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        {route.icon}
                    </ListItemIcon>
                    <ListItemText primary={route.label} />
                </ListItemButton>
            </ListItem>
        </Link>
    );

    const paperSx: PaperProps = {
        sx:  {
            width: width
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