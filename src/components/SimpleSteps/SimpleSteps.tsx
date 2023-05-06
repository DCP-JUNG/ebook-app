import { Box, Step, StepProps, Stepper } from '@mui/material';
import React, { useState } from 'react';
import StepButton from './StepButton';
import FinishStep from './FinishStep';

export interface SimpleStepData {
    stepProps: StepProps;
    children: React.ReactNode;
    onValidate: () => boolean;
};

export interface SimpleStepsProps {
    stepsData: SimpleStepData[]
}

const SimpleSteps = ({stepsData}: SimpleStepsProps) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {

        if(!stepsData[activeStep].onValidate()) {
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const steps = stepsData.map(data =>
        <Step {...data.stepProps}>{data.stepProps.children}</Step>
    );

    return (
        <Box sx={{mt: '10px'}}>
            <Stepper activeStep={activeStep}>
                { steps }
            </Stepper>
            {
                activeStep === steps.length ? (<FinishStep handleReset={handleReset}/>) : 
                (
                    <React.Fragment>
                        {stepsData[activeStep].children}
                        <StepButton activeStep={activeStep} stepsLength={steps.length} handleBack={handleBack} handleNext={handleNext} />
                    </React.Fragment>
                )
            }
        </Box>
    );
};

export default SimpleSteps;