import { Box } from "@mui/material";
import { BoxProps } from "@mui/system";

const StyledModalBox = (props: BoxProps) => (
    <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,  
    }}>
        {props.children}
    </Box>
);

export default StyledModalBox;