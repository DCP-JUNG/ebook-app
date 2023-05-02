import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HomeIcon from '@mui/icons-material/Home';
import Stories from '../views/Stories/Stories';

interface RouteData {
    label: string;
    pageTitle: string;
    link: string;
    icon: JSX.Element;
    content: JSX.Element;
};

const customRouteProvider : RouteData[] = [
    {  label: 'Home', link: '/', pageTitle: 'Home', icon: <HomeIcon />, content: <p>Home page!</p> },
    {  label: 'Stories', link: '/stories', pageTitle: 'Stories', icon: <AutoStoriesIcon />, content: <Stories /> }
];

export default customRouteProvider;