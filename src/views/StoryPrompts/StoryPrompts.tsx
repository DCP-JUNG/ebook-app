import React from 'react';
import MyTable from '../../components/MyTable/MyTable';
import useStoryPromptData from './hooks/useStoryPromptData';

const StoryPrompts = () => {
    return (<MyTable useDatas={useStoryPromptData}/>);
};

export default StoryPrompts;