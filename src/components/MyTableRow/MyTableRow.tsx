import React, { useState } from 'react';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import StyledTableRow from '../StyledTableRow/StyledTableRow';
import Fetcher from '../../utils/Fetcher';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { IconButton, TableCell, TableCellProps, Typography } from '@mui/material';


export interface MyTableRowProps {
    dataId: string;
    resourcesName: string;
    cellProps: MyTableCellProps[];
    hasLinkToDetails: boolean;
}

export interface MyTableCellProps {
    props: TableCellProps;
    children: JSX.Element;
};

const MyTableRow = ({dataId, cellProps, resourcesName, hasLinkToDetails}: MyTableRowProps) => {
    const [isDeleteStoryDialogOpen, setIsDeleteStoryDialogOpen] = useState<boolean>(false);
    const onDelete = async () => {
        const fetcher = Fetcher.create();
        await fetcher.deleteOneAsync(resourcesName, dataId);
    };

    const cells = cellProps.map((myCell, index) => <TableCell key={index} {...myCell.props}>{myCell.children}</TableCell>);

    return (
        <>
            <DeleteDialog question="Voulez-vous vraiment supprimer ?" onDelete={onDelete} isDeleteDialogOpen={isDeleteStoryDialogOpen} setIsDeleteDialogOpen={setIsDeleteStoryDialogOpen} />  
            <StyledTableRow key={dataId}>
                
                <TableCell component="th" scope="row">
                    { hasLinkToDetails && <Link to={`${dataId}`}>{dataId}</Link> }
                    { !hasLinkToDetails && <Typography variant="body1">{dataId}</Typography>}
                </TableCell>
                { cells }
                <TableCell component="th" scope="row">{
                    <IconButton aria-label="delete" onClick={() => setIsDeleteStoryDialogOpen(true)}>
                        <DeleteIcon color="error" />
                    </ IconButton>}</TableCell>
            </StyledTableRow>
        </>
    );
};

export default MyTableRow;