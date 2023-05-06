import { StepLabel } from "@mui/material";
import SimpleSteps, { SimpleStepData } from "../../components/SimpleSteps/SimpleSteps";
import SelectStoryPromptStep from "./components/SelectBasePromptStep";

const NewStory = () => {
    const steps: SimpleStepData[] = [{
        stepProps: { children:  <StepLabel>Sélectionner un template</StepLabel> }, 
        children: <SelectStoryPromptStep />, 
        onValidate: () => { return false;} 
    }];


    return (
        <SimpleSteps stepsData={steps}/>
    );
};

export default NewStory;