import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HomeIcon from '@mui/icons-material/Home';
import Stories from '../views/Stories/Stories';
import StoryDetails from '../views/StoryDetails/StoryDetails';
import { PathRouteProps } from 'react-router-dom';
import NewStory from '../views/NewStory/NewStory';

interface RouteData {
    menuLabel?: string;
    menuIcon?: JSX.Element;
    pageTitle: string;
    isVisibleOnLeftMenu: boolean;
    routeProps: PathRouteProps;
};

const customRouteProvider : RouteData[] = [
    {  
        menuLabel: 'Accueil', menuIcon: <HomeIcon />, pageTitle: 'Accueil', isVisibleOnLeftMenu: true, routeProps: {
            element: <p>Home page!</p>,
            path: '/'
        }
    },
    {  
        menuLabel: 'Histoires', menuIcon: <AutoStoriesIcon />, pageTitle: 'Histoires', isVisibleOnLeftMenu: true, routeProps: {
            element: <Stories />,
            path: '/stories'
        }
    },
    {  
        pageTitle: 'Détail d\'histoire', isVisibleOnLeftMenu: false, routeProps: {
            element: <StoryDetails />,
            path: '/stories/:storyId',
        }
    },
    {  
        pageTitle: 'Nouvelle histoire', isVisibleOnLeftMenu: false, routeProps: {
            element: <NewStory />,
            path: '/stories/create',
        }
    },
];

export default customRouteProvider;