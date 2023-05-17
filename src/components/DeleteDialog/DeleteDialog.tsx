import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

interface DeleteStoryDialogProps {
    onDelete: () => void;
    question: string;
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteDialog = ({onDelete, question, isDeleteDialogOpen, setIsDeleteDialogOpen}: DeleteStoryDialogProps) => {
    return (
        <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                Confirmez votre action
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                     {question}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsDeleteDialogOpen(false)}>Non</Button>
                <Button onClick={() => onDelete()} autoFocus>
                    Oui
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;