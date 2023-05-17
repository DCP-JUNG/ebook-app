import React, { useState } from 'react';
import MyTable, { TableFilterProps } from '../../components/MyTable/MyTable';
import useThemeData from './hooks/useThemeData';
import { Checkbox } from '@mui/material';

const Themes = () => {
    const [authorizedThemeFilter, setAuthorizedThemeFilter] = useState<string>('');
    const [isAuthorizedThemeFilterChecked, setIsAuthorizedThemeFilterChecked] = useState<boolean>(false);

    const onAuthorizedThemeFilterChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorizedThemeFilter(event.target.checked ? '?isAuthorizedOnly=true': '');
        setIsAuthorizedThemeFilterChecked(event.target.checked);
    };

    const filters: TableFilterProps = {
        filter: authorizedThemeFilter,
        setFilter: setAuthorizedThemeFilter,
        filterDialogProps: {
            filtersProps: [
                {
                    filterDisplay: <Checkbox checked={isAuthorizedThemeFilterChecked} onChange={onAuthorizedThemeFilterChecked} />,
                    filterLabel: 'Theme autorisés uniquement ?',
                }
            ]
        }        
    };

    return (<MyTable useDatas={useThemeData} hasFilters={true} filterProps={filters} />);
};

export default Themes;