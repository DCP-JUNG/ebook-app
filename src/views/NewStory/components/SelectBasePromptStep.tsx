import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import Fetcher from '../../../utils/Fetcher';
import Textbox from '../../../components/TextBox/Textbox';
import StoryPromptData from '../../StoryPrompts/data/StoryPromptData';

export interface SelectBasePromptStepProps {
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedTemplate: React.Dispatch<React.SetStateAction<StoryPromptData | undefined>>;
};

const SelectBasePromptStep = ({setIsValid, setSelectedTemplate}: SelectBasePromptStepProps) => {

    const defaultMenuItem = <MenuItem key='menu-item-none' value="none">None</MenuItem>;
    const [baseTemplates, setBaseTemplates] = useState<StoryPromptData[] | undefined>(undefined);
    const [menuItems, setMenuItems] = useState<React.ReactNode[]>([defaultMenuItem]);
    const [errorPage, setErrorPage] = useState<JSX.Element | undefined>(undefined);
    const [selectedMenuItem, setSelectedMenuItem] = useState<string | undefined>('none');

    useEffect(() => {

        setIsValid(false);

        const getBasePrompts = async () => {
            const fetcher = Fetcher.create();
            const storyPromptsResponse = await fetcher.getManyAsync<StoryPromptData>('story-prompts');

            if (!storyPromptsResponse.success){
                setBaseTemplates(undefined);
                setErrorPage(storyPromptsResponse.errorPage!);   
                setMenuItems([defaultMenuItem]);      
                return;
            }

            setBaseTemplates(storyPromptsResponse.datas!);
            setErrorPage(undefined);  

            const newMenuItems = storyPromptsResponse.datas!.map((storyPrompt, index) => <MenuItem key={`menu-item-${index}`} value={storyPrompt.id}>{storyPrompt.name}</MenuItem>);
            newMenuItems.push(defaultMenuItem);
            setMenuItems(newMenuItems);
        };

        getBasePrompts();
    }, []);

    const onSelectPromptChange = (event: SelectChangeEvent<string>) => {
        setSelectedMenuItem(event.target.value);  
        const isValid = event.target.value !== 'none'; 
        setIsValid(isValid);

        if (isValid) {
            const template = baseTemplates?.find(template => template.id == event.target.value);
            setSelectedTemplate(template!);
        }
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
                        <Select value={selectedMenuItem} label="Prompt" onChange={onSelectPromptChange}>
                            {menuItems}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={8}>       
                { 
                    baseTemplates !== undefined && 
                    <Box sx={{ mt: '30px' }}>
                        <Textbox>
                            <Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>{baseTemplates.find(storyPrompt => storyPrompt.id === selectedMenuItem!)?.prompt}</Typography>
                        </Textbox>
                    </Box>
                }       
                </Grid>
            </Grid> 
        </>
    );
};

export default SelectBasePromptStep;