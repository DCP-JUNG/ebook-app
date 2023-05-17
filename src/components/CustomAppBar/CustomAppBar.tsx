import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

interface CustomAppBarProps {
    height: number;
    isLeftMenuOpen: boolean;
    onMenuBtnClck: () => void;
}

const CustomAppBar = ({height, isLeftMenuOpen, onMenuBtnClck: onMenuBtnClick}: CustomAppBarProps) => {
    return (
        <AppBar position='fixed' color='secondary' sx={{ height: `${height}px` }}>
            <Toolbar>
                {
                    isLeftMenuOpen &&
                    <Typography color='Background' variant='h6'>
                        Ebook Application
                    </Typography>
                }
                <IconButton color="primary" size="large" edge="start" aria-label="menu" onClick={onMenuBtnClick} >
                    <MenuIcon />
                </IconButton>   
            </Toolbar>     
        </AppBar>
    );
};

export default CustomAppBar;