import AutoStoriesIcon from '@mui/icons-material/AutoStories';

interface RouteData {
    label: string;
    pageTitle: string;
    link: string;
    icon: JSX.Element;
    content: JSX.Element;
};

const customRouteProvider : RouteData[] = [
    {  label: 'Stories', link: '/stories', pageTitle: 'Stories', icon: <AutoStoriesIcon />, content: <p>Stories page!</p> }
];

export default customRouteProvider;