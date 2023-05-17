import { TableCell } from '@mui/material';
import React from 'react';

export interface MyTableColumnProps {
    columnName: string;
};

const MyTableColumn = ({columnName}: MyTableColumnProps) => {
    return <TableCell align="left">{columnName}</TableCell>;
};

export default MyTableColumn;