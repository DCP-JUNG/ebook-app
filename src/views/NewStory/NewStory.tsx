import { StepLabel } from "@mui/material";
import SimpleSteps, { SimpleStepData } from "../../components/SimpleSteps/SimpleSteps";
import SelectStoryPromptStep from "./components/SelectBasePromptStep";
import { useState } from "react";
import CustomizeBasePromptStep from "./components/CustomizeBasePromptStep";
import ImportGptResultsStep from "./components/ImportGptResultsStep";
import FinalizeStoryStep from "./components/FinalizeStoryStep";
import StoryPrompt from "./datas/StoryPrompt";

const NewStory = () => {

    const [isStep1Valid, setIsStep1Valid] = useState<boolean>(false);
    const [isStep2Valid, setIsStep2Valid] = useState<boolean>(false);
    const [isStep3Valid, setIsStep3Valid] = useState<boolean>(false);
    const [isStep4Valid, setIsStep4Valid] = useState<boolean>(false);

    const [selectedTemplate, setSelectedTemplate] = useState<StoryPrompt | undefined>();
    const [prompt, setPrompt] = useState<string>('');

    const [gptPromptResult, setGptPromptResult] = useState<string>('');

    const steps: SimpleStepData[] = [
        {
            stepProps: { children:  <StepLabel>Sélectionner un template</StepLabel> }, 
            children: <SelectStoryPromptStep setIsValid={setIsStep1Valid} setSelectedTemplate={setSelectedTemplate}/>, 
            onValidate: () => { return isStep1Valid;} 
        },
        {
            stepProps: { children:  <StepLabel>Remplacer les variables du template</StepLabel> }, 
            children: <CustomizeBasePromptStep setIsValid={setIsStep2Valid} setPrompt={setPrompt} selectedTemplate={selectedTemplate!}/>, 
            onValidate: () => { return isStep2Valid;} 
        },
        {
            stepProps: { children:  <StepLabel>Importer le résultat de GPT</StepLabel> }, 
            children: <ImportGptResultsStep setIsValid={setIsStep3Valid} setGptPromptResult={setGptPromptResult} prompt={prompt}/>, 
            onValidate: () => { return isStep3Valid;} 
        }
        ,
        {
            stepProps: { children:  <StepLabel>Importer le résultat de GPT</StepLabel> }, 
            children: <FinalizeStoryStep setIsValid={setIsStep4Valid} gptPromptResult={gptPromptResult}/>, 
            onValidate: () => { return isStep4Valid;} 
        }
    ];


    return <SimpleSteps stepsData={steps}/>;
};

export default NewStory;