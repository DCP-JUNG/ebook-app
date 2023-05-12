import { Button, Snackbar } from '@mui/material';
import React, { useState } from 'react';

interface CopyToClipboardButtonProps {
    copyValue: string;
}

const CopyToClipboardButton = ({copyValue}: CopyToClipboardButtonProps) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(copyValue);
    }

    return (
       <>
          <Button variant="contained" onClick={handleClick}>Copy</Button>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
       </>
    );
};

export default CopyToClipboardButton;