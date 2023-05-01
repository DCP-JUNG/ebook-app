import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Typography } from '@mui/material';

interface CustomAppBarProps {
    marginLeft: number;
};

const CustomAppBar = ({marginLeft} :CustomAppBarProps ) => {
    return (
        <AppBar position='static' sx={{ marginLeft:  marginLeft}}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} >
                <MenuIcon />
            </IconButton>   
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Ebook Application
            </Typography>
        </AppBar>
    );
};

export default CustomAppBar;