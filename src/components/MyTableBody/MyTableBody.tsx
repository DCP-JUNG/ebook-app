import React from 'react';
import MyTableRow, { MyTableRowProps } from '../MyTableRow/MyTableRow';
import { TableBody } from '@mui/material';

export interface MyTableBodyProps {
    rowsProps: MyTableRowProps[];
};

const MyTableBody = ({rowsProps}: MyTableBodyProps) => {
    const rows = rowsProps.map((rowProps, index) => <MyTableRow key={index} {...rowProps}/>);
    return (
        <TableBody>
            {rows}
        </TableBody>
    );
};

export default MyTableBody;