import React from 'react';

interface ImportGptResultsStepProps {
    setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
    setGptPromptResult: React.Dispatch<React.SetStateAction<string>>;
    prompt: string;
}

const ImportGptResultsStep = ({setIsValid, setGptPromptResult, prompt} : ImportGptResultsStepProps) => {
    return (
        <div>
            
        </div>
    );
};

export default ImportGptResultsStep;