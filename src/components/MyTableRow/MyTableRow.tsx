import React, { useState } from 'react';
import DeleteDialog from '../ConfirmDialog/ConfirmDialog';
import StyledTableRow from '../StyledTableRow/StyledTableRow';
import Fetcher from '../../utils/Fetcher';
import DeleteIcon from '@mui/icons-material/Delete';
import PageviewIcon from '@mui/icons-material/Pageview';
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
        setIsDeleteStoryDialogOpen(false);
    };

    const cells = cellProps.map((myCell, index) => <TableCell key={index} {...myCell.props}>{myCell.children}</TableCell>);

    return (
        <>
            <DeleteDialog question="Voulez-vous vraiment supprimer ?" onApprove={onDelete} isOpen={isDeleteStoryDialogOpen} setIsOpen={setIsDeleteStoryDialogOpen} />  
            <StyledTableRow key={dataId}>
                <TableCell component="th" scope="row">
                    <Typography variant="body1">{dataId}</Typography>
                </TableCell>
                { cells }
                <TableCell component="th" scope="row">
                    {
                        hasLinkToDetails &&
                        <IconButton aria-label="view">

                            <Link to={`${dataId}`}>
                                <PageviewIcon color="secondary" />
                            </Link>
                        </IconButton>
                    }
                    <IconButton aria-label="delete" onClick={() => setIsDeleteStoryDialogOpen(true)}>
                        <DeleteIcon color="error" />
                    </ IconButton>
                </TableCell>
            </StyledTableRow>
        </>
    );
};

export default MyTableRow;