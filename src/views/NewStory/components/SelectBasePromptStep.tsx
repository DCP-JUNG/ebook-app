import React, { useEffect, useState } from 'react';
import StoryPrompt from '../datas/StoryPrompt';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import Fetcher from '../../../utils/Fetcher';
import Textbox from '../../../components/TextBox/Textbox';
import PromptStepProps from '../interfaces/promptStep';

const SelectBasePromptStep = ({setIsValid}: PromptStepProps) => {

    const defaultMenuItem = <MenuItem key='menu-item-none' value="none">None</MenuItem>;
    const [basePromps, setBasePromps] = useState<StoryPrompt[] | undefined>(undefined);
    const [menuItems, setMenuItems] = useState<React.ReactNode[]>([defaultMenuItem]);
    const [errorPage, setErrorPage] = useState<JSX.Element | undefined>(undefined);
    const [selectedPrompt, setSelectedPrompt] = useState<string | undefined>('none');

    useEffect(() => {

        setIsValid(false);

        const getBasePrompts = async () => {
            const fetcher = Fetcher.create();
            const storyPromptsResponse = await fetcher.getManyAsync<StoryPrompt>('story-prompts');

            if (!storyPromptsResponse.success){
                setBasePromps(undefined);
                setErrorPage(storyPromptsResponse.errorPage!);   
                setMenuItems([defaultMenuItem]);      
                return;
            }

            setBasePromps(storyPromptsResponse.datas!);
            setErrorPage(undefined);  

            const newMenuItems = storyPromptsResponse.datas!.map((storyPrompt, index) => <MenuItem key={`menu-item-${index}`} value={storyPrompt.id}>{storyPrompt.name}</MenuItem>);
            newMenuItems.push(defaultMenuItem);
            setMenuItems(newMenuItems);
        };

        getBasePrompts();
    }, []);

    const onSelectPromptChange = (event: SelectChangeEvent<string>) => {
        setSelectedPrompt(event.target.value);   
        setIsValid(event.target.value !== 'none');
    };

    if (errorPage !== undefined) {
        return (<>{errorPage}</>);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={4}>
                    <FormControl fullWidth sx={{ mt: '30px', mb: '30px' }}>
                        <InputLabel id="demo-simple-select-label">Prompts</InputLabel>
                        <Select value={selectedPrompt} label="Prompt" onChange={onSelectPromptChange}>
                            {menuItems}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={8}>       
                { 
                    basePromps !== undefined && 
                    <Box sx={{ mt: '30px' }}>
                        <Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>{basePromps.find(storyPrompt => storyPrompt.id === selectedPrompt!)?.description}</Typography>
                        <Textbox>
                            <Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>{basePromps.find(storyPrompt => storyPrompt.id === selectedPrompt!)?.prompt}</Typography>
                        </Textbox>
                    </Box>
                }       
                </Grid>
            </Grid> 
        </>
    );
};

export default SelectBasePromptStep;