import React from 'react';
import MyTable from '../../components/MyTable/MyTable';
import useStoryData from './hooks/useStoryData';

const Stories = () => {
    return (<MyTable useDatas={useStoryData}/>);
};

export default Stories;