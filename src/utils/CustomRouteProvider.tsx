import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HomeIcon from '@mui/icons-material/Home';
import Stories from '../views/Stories/Stories';
import StoryDetails from '../views/StoryDetails/StoryDetails';
import { PathRouteProps } from 'react-router-dom';
import NewStory from '../views/NewStory/NewStory';
import Themes from '../views/Themes/Themes';
import StoryPrompts from '../views/StoryPrompts/StoryPrompts';
import AbcIcon from '@mui/icons-material/Abc';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface RouteData {
    menuLabel?: string;
    menuIcon?: JSX.Element;
    pageTitle: string;
    isVisibleOnLeftMenu: boolean;
    routeProps: PathRouteProps;
};

const customRouteProvider : RouteData[] = [
    {  
        menuLabel: 'Accueil', menuIcon: <HomeIcon color="secondary"/>, pageTitle: 'Accueil', isVisibleOnLeftMenu: true, routeProps: {
            element: <p>Home page!</p>,
            path: '/'
        }
    },
    {  
        menuLabel: 'Histoires', menuIcon: <AutoStoriesIcon color="secondary"/>, pageTitle: 'Histoires', isVisibleOnLeftMenu: true, routeProps: {
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
    {  
        menuLabel: 'Themes', menuIcon: <AbcIcon color="secondary"/>, pageTitle: 'Themes', isVisibleOnLeftMenu: true, routeProps: {
            element: <Themes />,
            path: '/themes'
        }
    },
    {  
        menuLabel: 'Prompts', menuIcon: <TextSnippetIcon color="secondary"/>, pageTitle: 'Prompts', isVisibleOnLeftMenu: true, routeProps: {
            element: <StoryPrompts />,
            path: '/story-prompts'
        }
    },
];

export default customRouteProvider;