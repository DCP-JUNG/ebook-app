import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import getDatas, { tableColumns, tableRows } from './StoriesColumns';
import { useEffect, useState } from 'react';
import Fetcher from '../../../../utils/Fetcher';

const StoriesTable = () => {
   const [rows, setRows] = useState<JSX.Element[]>([]);
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

   const loadDatas = async () => {
        const fetchManyResult = await getDatas();
        if (fetchManyResult.success) {
            const localRows = tableRows(fetchManyResult.datas!, confirmStoryDelete);
            setRows(localRows);
        }
    };

    const confirmStoryDelete = (storyId: string) => 
        <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                {"Supprimer l'histoire?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Voulez-vous vraiment supprimer l'histoire ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsDeleteDialogOpen(false)}>Non</Button>
                <Button onClick={() => onStoryDelete(storyId)} autoFocus>
                    Oui
                </Button>
            </DialogActions>
        </Dialog>
    ;

   const onStoryDelete = async (storyId: string) => {
        const fetcher = Fetcher.create();
        const deleteOneResponse = await fetcher.deleteOneAsync('stories', storyId);
        if (!deleteOneResponse.success) {
            return;
        }

        await loadDatas();
   };

    useEffect(() => {
        loadDatas();
    }, [rows]);

    return (
        <TableContainer component={Paper} sx={{ mt: '10px'}} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>{tableColumns}</TableHead>
                <TableBody>{rows}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default StoriesTable;