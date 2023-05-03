import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HomeIcon from '@mui/icons-material/Home';
import Stories from '../views/Stories/Stories';
import StoryDetails from '../views/StoryDetails/StoryDetails';
import { PathRouteProps } from 'react-router-dom';

interface RouteData {
    menuLabel: string;
    menuIcon: JSX.Element;
    pageTitle: string;
    isVisibleOnLeftMenu: boolean;
    routeProps: PathRouteProps;
};

const customRouteProvider : RouteData[] = [
    {  
        menuLabel: 'Home', menuIcon: <HomeIcon />, pageTitle: 'Home', isVisibleOnLeftMenu: true, routeProps: {
            element: <p>Home page!</p>,
            path: '/'
        }
    },
    {  
        menuLabel: 'Stories', menuIcon: <AutoStoriesIcon />, pageTitle: 'Stories', isVisibleOnLeftMenu: true, routeProps: {
            element: <Stories />,
            path: '/stories'
        }
    },
    {  
        menuLabel: 'Story detail', menuIcon: <AutoStoriesIcon />, pageTitle: 'Story detail', isVisibleOnLeftMenu: false, routeProps: {
            element: <StoryDetails />,
            path: '/stories/:storyId',
        }
    },

];

export default customRouteProvider;