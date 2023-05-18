import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

interface DeleteStoryDialogProps {
    onApprove: () => void;
    question: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteDialog = ({onApprove, question, isOpen, setIsOpen}: DeleteStoryDialogProps) => {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                Confirmez votre action
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                     {question}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button key='no-btn' onClick={() => setIsOpen(false)}>Non</Button>
                <Button key='yes-btn' onClick={() => onApprove()} autoFocus>
                    Oui
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;