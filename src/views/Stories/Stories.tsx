import React from 'react';
import StoriesTable from './components/storiesTable/StoriesTable';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Stories = () => {
    return (
        <>
            <Link to={"create"}>
                <Button sx={{mt: '10px', mb: '10px' }} variant="contained">Nouvelle histoire</Button>
            </Link>
            <StoriesTable/>
        </>
    );
};

export default Stories;