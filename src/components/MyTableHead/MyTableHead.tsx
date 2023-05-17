import React from 'react';
import MyTableColumn, { MyTableColumnProps } from '../MyTableColumn/MyTableColumn';
import { TableHead, TableRow } from '@mui/material';

export interface MyTableHeadProps {
    columnProps: MyTableColumnProps[]
};

const MyTableHead = ({columnProps}: MyTableHeadProps) => {
    return (
        <TableHead>
            <TableRow>
                { columnProps.map((columnProp, index) => <MyTableColumn key={index} {...columnProp}/>)  }
            </TableRow>
        </TableHead>
    );
};

export default MyTableHead;