import { Grid, LinearProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import StoryData from '../Stories/datas/StoryData';
import { useEffect, useState } from 'react';
import Fetcher from '../../utils/Fetcher';

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
                <Grid xs={4}>
                    <Typography variant='body1'>{story.body}</Typography>
                </Grid>
                <Grid xs={8}>
                    <Typography variant='body1'>{story.body}</Typography>
                </Grid> 
            </Grid>          
        </>
    );
};

export default StoryDetails;