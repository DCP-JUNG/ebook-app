import { Button, Snackbar } from '@mui/material';
import React, { useState } from 'react';

interface CopyToClipboardButtonProps {
    copyValue: string;
    disabled: boolean;
}

const CopyToClipboardButton = ({copyValue, disabled}: CopyToClipboardButtonProps) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(copyValue);
    }

    return (
       <>
          <Button disabled={disabled} variant="contained" onClick={handleClick}>Copy</Button>
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