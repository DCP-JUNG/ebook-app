import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogTitle, FormControl, InputLabel, Select, SelectChangeEvent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import StoryPrompt from '../datas/StoryPrompt';
import Textbox from '../../../components/TextBox/Textbox';
import Theme from '../../Themes/datas/Theme';

export interface CustomizeBasePromptStepProps {
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    selectedTemplate: StoryPrompt;
};

const CustomizeBasePromptStep = ({setIsValid, setPrompt, selectedTemplate}: CustomizeBasePromptStepProps) => {
    
    const [themes, setThemes] = useState<Theme[]>([]);
    const [themeMenuItems, setThemeMenuItems] = useState<React.ReactNode[]>([]);
    const [themeSelectedValue, setThemeSelectedValue] = useState<string>('');
    const [isThemeDialogOpen, setIsThemeDialogOpen] = useState<boolean>(false);
    const [finalPrompt, setFinalPrompt] = useState<string>(selectedTemplate.prompt);

    useEffect(() => {

    }, []);
    

    const onThemeSelectedValueChange = (event:  SelectChangeEvent<string>) => {

    }

    const onThemeDialogClosed = () => {
        setIsThemeDialogOpen(false);
    };

    const selectThemeElement =  
        <Dialog onClose={onThemeDialogClosed} open={isThemeDialogOpen}>
            <DialogTitle>Selectionner un theme</DialogTitle>
            <FormControl fullWidth sx={{ mt: '30px', mb: '30px' }}>
                <InputLabel>Themes</InputLabel>
                <Select value={themeSelectedValue} label="Themes" onChange={onThemeSelectedValueChange}>
                    {themeMenuItems}
                </Select>
            </FormControl>
        </Dialog>
    ;
    

    const hasTheme = selectedTemplate.prompt.includes("{theme}");
    const hasForbiddenThemes = selectedTemplate.prompt.includes("{forbiddenThemes}");
    
    let highlightedPrompt = <Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>{selectedTemplate.prompt}</Typography>;
    if (hasTheme) {
        const themeSplit = selectedTemplate.prompt.split('{theme}');
        // const newFinalPrompt = finalPrompt.replace({'theme', ''});
        highlightedPrompt = 
            <>
                <Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>{themeSplit[0]}</Typography>
                    <Button variant="text" onClick={() => { setIsThemeDialogOpen(true); }}>theme</Button>
                    {selectThemeElement}
                <Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>{themeSplit[1]}</Typography>
            </>
        ;
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <Box sx={{ mt: '30px' }}>
                        <Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>{selectedTemplate.description}</Typography>
                        <Textbox>
                            {highlightedPrompt}
                        </Textbox>
                    </Box>
                </Grid>
                <Grid xs={6}>       
                    <Box sx={{ mt: '30px' }}>
                        <Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>Prompt final</Typography>
                        <Textbox>
                            <Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>{finalPrompt}</Typography>
                        </Textbox>
                    </Box>
                </Grid>
            </Grid> 
        </>
    );
};

export default CustomizeBasePromptStep;