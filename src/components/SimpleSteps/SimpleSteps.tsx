import { Box, Step, StepProps, Stepper } from '@mui/material';
import React, { useState } from 'react';
import StepButtons from './StepButtons';
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
    const handleNext = () =>  setActiveStep((prevActiveStep) => prevActiveStep + (!isValid ? 0 : 1));
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);

    const isValid = stepsData[activeStep]?.onValidate() ?? false;
    const steps = stepsData.map((data, index) => <Step key={`step-${index}`} {...data.stepProps}>{data.stepProps.children}</Step>);

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
                        <StepButtons activeStep={activeStep} stepsLength={steps.length} handleBack={handleBack} handleNext={handleNext} canGoNext={isValid}/>
                    </React.Fragment>
                )
            }
        </Box>
    );
};

export default SimpleSteps;