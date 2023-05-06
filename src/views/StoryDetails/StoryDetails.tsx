import { LinearProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams } from 'react-router-dom';
import StoryData from '../Stories/datas/StoryData';
import { useEffect, useState } from 'react';
import Fetcher from '../../utils/Fetcher';
import StoryDisplay from './components/storyDisplay/StoryDisplay';
import StoryImagePromptsTable from './components/storyImagePromptsTable/StoryImagePromptsTable';

const StoryDetails = () => {
    
    const { storyId } = useParams<{ storyId: string }>();
    const [story, setStory] = useState<StoryData | undefined>(undefined);
    const [errorPage, setErrorPage] = useState<JSX.Element | undefined>(undefined);

    useEffect(() => {
        const loadDatas = async () => {
            const fetcher = Fetcher.create();
            const fetchOneResult = await fetcher.getOneAsync<StoryData>(`stories/${storyId}`);
            if (!fetchOneResult.success) {
                setErrorPage(fetchOneResult.errorPage);
            }

            setStory(fetchOneResult.data);
        }

        loadDatas();
    }, []);

    if (errorPage !== undefined) {
        return(<>{errorPage}</>);
    }

    if (story === undefined) {
        return <LinearProgress />
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={4}><StoryDisplay story={story}/></Grid>
                <Grid xs={8}><StoryImagePromptsTable storyImagePrompts={story.imageStoryPrompts} /></Grid> 
            </Grid>   
        </>
    );
};

export default StoryDetails;