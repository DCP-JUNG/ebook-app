import { Box, Button } from '@mui/material';
import React from 'react';

interface BackButtonProps {
    activeStep: number;
    handleBack: () => void;
    handleNext: () => void;
    stepsLength: number;
}

const BackButton = ({activeStep, handleBack, handleNext, stepsLength}: BackButtonProps) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />  
            <Button onClick={handleNext}>
              {activeStep === stepsLength - 1 ? 'Finish' : 'Next'}
            </Button>
        </Box>
    );
};

export default BackButton;