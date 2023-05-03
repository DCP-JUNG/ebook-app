import { Button, Modal, ModalProps, Typography } from '@mui/material';
import { useState } from 'react';
import StyledModalBox from './StyledModalBox';

interface SimpleModalProps {
    title: string;
    description: string;
    content: JSX.Element;
};

const SimpleModal = ({title, description, content}: SimpleModalProps) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
             <Button onClick={handleOpen}>Voir</Button>
             <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <StyledModalBox>
                    <Typography id="modal-modal-title" variant="h6" component="h2">{title}</Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>{description}</Typography>
                    {content}
                </StyledModalBox>
            </Modal>
        </div>
    );
};

export default SimpleModal;