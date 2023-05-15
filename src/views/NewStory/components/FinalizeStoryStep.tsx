import React, { useEffect, useState } from 'react';
import Fetcher from '../../../utils/Fetcher';
import StoryData from '../../Stories/datas/StoryData';
import CreateStoryCommand from '../datas/CreateStoryCommand';

export interface FinalizeStoryStepProps {
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
    gptPromptResult: string;
}

const FinalizeStoryStep = ({setIsValid, gptPromptResult}: FinalizeStoryStepProps) => {

    const [story, setStory] = useState<StoryData>();

    useEffect( () => {
        const createStoryAsync = async () => {

            if (story !== undefined) {
                return;
            }

            const fetcher = Fetcher.create();
            const response = await fetcher.postWithResponseBodyAsync<CreateStoryCommand, StoryData>('stories', { gptResponse: encodeURIComponent(gptPromptResult) }, true);

            console.log(response);
            if (!response.success) {
                return;
            }
  
            setStory(response.data!);  
        };

        createStoryAsync();     
    }, [gptPromptResult]);

    return (
        <>
            
        </>
    );
};

export default FinalizeStoryStep;