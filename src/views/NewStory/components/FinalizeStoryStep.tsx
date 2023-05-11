import React from 'react';

export interface FinalizeStoryStepProps {
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
    gptPromptResult: string;
}

const FinalizeStoryStep = ({setIsValid, gptPromptResult}: FinalizeStoryStepProps) => {
    return (
        <div>
            
        </div>
    );
};

export default FinalizeStoryStep;