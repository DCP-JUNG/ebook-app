import React from 'react';
import MyTable from '../../components/MyTable/MyTable';
import useData from './hooks/useData';

const Themes = () => {
    return (<MyTable useDatas={useData} />);
};

export default Themes;