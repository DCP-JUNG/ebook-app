import React from 'react';
import MyTable from '../../components/MyTable/MyTable';
import useData from './hooks/useData';

const Stories = () => {
    return (<MyTable useDatas={useData}/>);
};

export default Stories;