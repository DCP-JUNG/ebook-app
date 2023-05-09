import { StepLabel } from "@mui/material";
import SimpleSteps, { SimpleStepData } from "../../components/SimpleSteps/SimpleSteps";
import SelectStoryPromptStep from "./components/SelectBasePromptStep";
import { useState } from "react";

const NewStory = () => {

    const [isStep1Valid, setIsStep1Valid] = useState<boolean>(false);

    const steps: SimpleStepData[] = [{
        stepProps: { children:  <StepLabel>Sélectionner un template</StepLabel> }, 
        children: <SelectStoryPromptStep setIsValid={setIsStep1Valid} />, 
        onValidate: () => { return isStep1Valid;} 
    }];


    return (
        <SimpleSteps stepsData={steps}/>
    );
};

export default NewStory;