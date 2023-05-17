import React, { useEffect, useState } from 'react';
import Fetcher from '../../../utils/Fetcher';
import StoryData from '../../Stories/datas/StoryData';
import CreateStoryCommand from '../datas/CreateStoryCommand';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export interface FinalizeStoryStepProps {
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
    gptPromptResult: string;
}

const FinalizeStoryStep = ({setIsValid, gptPromptResult}: FinalizeStoryStepProps) => {

    const [story, setStory] = useState<StoryData>();
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);


    useEffect( () => {
        const createStoryAsync = async () => {

            if (story !== undefined) {
                setIsSuccess(true);
                return;
            }

            const fetcher = Fetcher.create();
            const response = await fetcher.postWithResponseBodyAsync<CreateStoryCommand, StoryData>('stories', { gptResponse: encodeURIComponent(gptPromptResult) }, true);
            
            if (!response.success) {
                setIsSuccess(false);
                return;
            }
  
            setStory(response.data!);  
            setIsSuccess(true);
        };

        createStoryAsync();     
    }, [gptPromptResult]);

    const storyLink = `/stories/${story?.id}`;

    if (isSuccess === null) {
        return (<CircularProgress />);
    }

    return (
        <Box textAlign="center">
            <Typography variant="h1" component="h1" gutterBottom>
                { isSuccess ? 'Réussi!' : 'Erreur!'  }
            </Typography>
            { 
                isSuccess && 
                <Button variant="contained" component={RouterLink} to={storyLink}>
                    Voir l'histoire
                </Button>
            }
            {
                !isSuccess &&
                <Typography variant="h4" component="h4" gutterBottom>
                    Une erreur s'est produite pendant la création de l'histoire..
                 </Typography>
            }

            <Button variant="contained" component={RouterLink} to="/">
                Retour à la page principale
            </Button>
        </Box>
    );
};

export default FinalizeStoryStep;