import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Dialog, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import StoryPrompt from '../datas/StoryPrompt';
import Textbox from '../../../components/TextBox/Textbox';
import Theme from '../../Themes/datas/Theme';
import Fetcher from '../../../utils/Fetcher';
import CopyToClipboardButton from '../../../components/CopyToClipboardButton/CopyToClipboardButton';

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

    const [forbiddenThemeMenuItems, setForbiddenThemeMenuItems] = useState<React.ReactNode[]>([]);
    const [forbiddenThemeSelectedValue, setForbiddenThemeSelectedValue] = useState<string[]>([]);
    const [isForbiddenThemeDialogOpen, setIsForbiddenThemeDialogOpen] = useState<boolean>(false);

    const hasTheme = selectedTemplate.prompt.includes("{theme}");
    const hasForbiddenThemes = selectedTemplate.prompt.includes("{forbiddenThemes}");

    const themeStr = hasTheme ? "{theme}" : "";
    const forbiddenThemesStr = hasForbiddenThemes ? "{forbiddenThemes}" : "";
    const searchReg = `${themeStr}|${forbiddenThemesStr}`;
    const defaultFinalPrompt = selectedTemplate.prompt.replace(new RegExp(searchReg, "g"), '');
    const [finalPrompt, setFinalPrompt] = useState<string>(defaultFinalPrompt);

    useEffect(() => {
        const getThemes  = async () => {
            const fetcher = Fetcher.create();
            const response = await fetcher.getManyAsync<Theme>("themes");

            if (!response.success) {
                return;
            }

            const menuItems = response.datas!
                .filter(data => !data.isForbidden)
                .map((data, index) => <MenuItem key={`menu-item-index-${index}`} value={data.id}>{data.name}</MenuItem>);

            const menuForbiddenItems = response.datas!
                .filter(data => data.isForbidden)
                .map((data, index) => 
                    <MenuItem key={`menu-forbidden-item-index-${index}`} value={data.id}>{data.name}
                        <Checkbox checked={isForbiddenThemeChecked(data)} />
                    </MenuItem>
                );

            setThemes(response.datas!);
            setForbiddenThemeMenuItems(menuForbiddenItems);
            setThemeMenuItems(menuItems);
        };

        getThemes();
    }, [forbiddenThemeSelectedValue]);

    const isForbiddenThemeChecked = (theme: Theme) : boolean => {
        return forbiddenThemeSelectedValue.indexOf(theme.id) > -1;
    }    

    const onThemeSelectedValueChange = (event:  SelectChangeEvent<string>) => {
        setThemeSelectedValue(event.target.value);
    }

    const onForbiddenThemeSelectedValueChange = (event:  SelectChangeEvent<string[]>) => {
        setForbiddenThemeSelectedValue(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
    }

    const onForbiddenThemeDialogClosed = () => {
        setIsForbiddenThemeDialogOpen(false);
        changeFinalPrompt();
    };

    const onThemeDialogClosed = () => {
        setIsThemeDialogOpen(false);
        changeFinalPrompt();
    };

    const changeFinalPrompt = () => {
        const  [isThemeSelected, isForbiddenThemeSelected, isOk] = isValid();
        const finalPrompt = selectedTemplate.prompt
            .replace(new RegExp(themeStr, "g"), isThemeSelected ? themes.find(theme => theme.id === themeSelectedValue)?.name! : '')
            .replace(new RegExp(forbiddenThemesStr, "g"), isForbiddenThemeSelected ? themes.filter(theme => forbiddenThemeSelectedValue.includes(theme.id)).map(theme => theme.name).join(', ') : '')
        ;

        setFinalPrompt(finalPrompt);
        setIsValid(isOk);
    }

    const isValid = () : [isThemeSelected: boolean, isForbiddenSelected: boolean, isValid: boolean] => {
        const isThemeSelected = themeSelectedValue !== '' && themeSelectedValue !== undefined && themeSelectedValue !== null;
        const isForbiddenSelected = forbiddenThemeSelectedValue.length > 0;
        return [
            isThemeSelected,
            isForbiddenSelected,
            isThemeSelected && isForbiddenSelected
        ];
    }

    return (
        <>
            <Box sx={{ mt: '30px' }}>
                <Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>{selectedTemplate.description}</Typography>
                <Textbox>
                    <Button sx={{visibility: `${hasTheme ? 'visible' : 'hidden'}`}} variant="text" onClick={() => { setIsThemeDialogOpen(true); }}>theme</Button>
                    <Button sx={{visibility: `${hasForbiddenThemes ? 'visible' : 'hidden'}`}} variant="text" onClick={() => { setIsForbiddenThemeDialogOpen(true); }}>forbidden theme</Button>
                </Textbox>
                <Textbox>
                    <Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>{finalPrompt}</Typography>
                </Textbox>
                <CopyToClipboardButton copyValue={finalPrompt}/>
            </Box>

            <Dialog onClose={onThemeDialogClosed} open={isThemeDialogOpen}>
                <DialogTitle>Selectionner un theme</DialogTitle>
                <FormControl fullWidth sx={{ mt: '30px', mb: '30px' }}>
                    <InputLabel>Themes</InputLabel>
                    <Select key="theme-select" value={themeSelectedValue} label="Themes" onChange={onThemeSelectedValueChange}>
                        {themeMenuItems}
                    </Select>
                </FormControl>
            </Dialog>

            <Dialog onClose={onForbiddenThemeDialogClosed} open={isForbiddenThemeDialogOpen}>
                <DialogTitle>Selectionner des themes interdits</DialogTitle>
                <FormControl fullWidth sx={{ mt: '30px', mb: '30px' }}>
                    <InputLabel>Themes</InputLabel>
                    <Select key="forbbiden-themes-select" 
                        multiple 
                        renderValue={(selected: string[]) => {
                                const selectedThemes =  themes.filter(theme => selected.includes(theme.id));
                                return selectedThemes.map(theme => theme.name).join(', ');
                            }
                        } 
                        value={forbiddenThemeSelectedValue} label="Themes interdits" 
                        onChange={onForbiddenThemeSelectedValueChange}>
                        {forbiddenThemeMenuItems}
                    </Select>
                </FormControl>
            </Dialog>
        </>
    );
};

export default CustomizeBasePromptStep;