import React, { useState } from 'react';
import MyTableHead, { MyTableHeadProps } from '../MyTableHead/MyTableHead';
import MyTableBody, { MyTableBodyProps } from '../MyTableBody/MyTableBody';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, CircularProgress, Paper, Table, TableContainer, TablePagination } from '@mui/material';
import { Link } from 'react-router-dom';
import FilterDialog, { FilterDialogProps } from '../FilterDialog/FilterDialog';

export interface TableFilterProps {
    filterDialogProps: FilterDialogProps;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export interface MyTableProps {
    hasFilters?: boolean;
    filterProps?: TableFilterProps;
    useDatas: (filter?: string) => [boolean, MyTableDatas];
};

export interface MyTableDatas {
    tableHeaderProps: MyTableHeadProps;
    tableBodyProps: MyTableBodyProps;
}

const MyTable = ({useDatas, hasFilters = false, filterProps}: MyTableProps) => {
    const [isLoading, tableProps] = useDatas(filterProps?.filter);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentRowsPerPage, setCurrentRowsPerPage] = useState<number>(10);

    const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setCurrentPage(page);
    };

    const onRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newRowsPerPage = parseInt(event.target.value);
        setCurrentRowsPerPage(newRowsPerPage);
    };

    return (
        <>
            <Link to={"create"}>
                <Button variant="outlined" startIcon={<AddIcon />} sx={{mt: '10px', mb: '10px', mr: '10px' }}>Nouveau</Button>
            </Link>
            { hasFilters && <FilterDialog {...filterProps?.filterDialogProps!} />}
            { 
                isLoading && 
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress />
                </Box> 
            }
            <TableContainer component={Paper} sx={{ mt: '10px'}} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <MyTableHead {...tableProps.tableHeaderProps} />
                    <MyTableBody {...tableProps.tableBodyProps}/>
                    <TablePagination 
                        count={tableProps.tableBodyProps.rowsProps.length} 
                        page={currentPage} 
                        rowsPerPage={currentRowsPerPage} 
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}  
                        rowsPerPageOptions={[10, 25, 50]}
                        showFirstButton={true}
                        showLastButton={true}
                        labelRowsPerPage={"Lignes par pages"}
                    />
                </Table>
            </TableContainer>
        </>
    );
};

export default MyTable;