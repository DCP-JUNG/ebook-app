import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface FinishStepProps {
    handleReset: () => void;
}

const FinishStep = ({handleReset}: FinishStepProps) => {
    return (
        <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
            </Box>
        </React.Fragment>
    );
};

export default FinishStep;