import { Box, Link, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import Textbox from '../../../components/TextBox/Textbox';
import CopyToClipboardButton from '../../../components/CopyToClipboardButton/CopyToClipboardButton';

interface ImportGptResultsStepProps {
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
    setGptPromptResult: React.Dispatch<React.SetStateAction<string>>;
    prompt: string;
}

const ImportGptResultsStep = ({setIsValid, setGptPromptResult, prompt} : ImportGptResultsStepProps) => {

    const [textFieldValue, setTextFieldValue] = useState<string>('');
    
    const onTextFieldChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTextFieldValue(event.target.value);

        const isValid = event.target.value !== '' && event.target.value !== undefined && event.target.value !== null;
        setIsValid(isValid);

        if (isValid) {
            setGptPromptResult(event.target.value);
        }
    }

    return (
        <Box sx={{ mt: '30px' }}>
            <CopyToClipboardButton copyValue={prompt} disabled={false}/>
            <Typography variant='body1'>
                Allez sur chat openai pour coller le text de l'étape précédente : <Link href="https://chat.openai.com/" target="_blank">Chat.Openai</Link>
            </Typography>
            <Textbox>    
                <TextField sx={{ minWidth: 1200}} label="Resultat" multiline rows={30} onChange={onTextFieldChange} value={textFieldValue}/>
            </Textbox>
        </Box>
    );
};

export default ImportGptResultsStep;