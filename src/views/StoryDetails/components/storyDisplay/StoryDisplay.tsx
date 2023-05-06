import React from 'react';
import StoryData from '../../../Stories/datas/StoryData';
import Textbox from '../../../../components/TextBox/Textbox';
import { Divider, Typography } from '@mui/material';

interface StoryDisplayProps {
    story: StoryData;
};

const StoryDisplay = ({story} : StoryDisplayProps) => {
    return (
        <Textbox>
            <Typography variant='h6'>{story.title}</Typography>
            <Divider sx={{ mt: '10px', mb: '10px' }}/>
            {<Typography sx={{ whiteSpace: 'pre-line' }} variant='body1'>{story.body}</Typography>}
        </Textbox>
    );
};

export default StoryDisplay;