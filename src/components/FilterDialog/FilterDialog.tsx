import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import Transition from '../Transition/Transition';

export interface FilterProps {
    filterLabel: string;
    filterDisplay: JSX.Element;
};

export interface FilterDialogProps {
    filtersProps: FilterProps[];
};

const FilterDialog = ({filtersProps}: FilterDialogProps ) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const onButtonClick = () => setIsDialogOpen(true);
    const handleClose = () =>  setIsDialogOpen(false);
    
    return (
        <>
            <Button variant='outlined' startIcon={<FilterListIcon />} onClick={onButtonClick}>Filtres</Button>
            <Dialog TransitionComponent={Transition} onClose={handleClose} open={isDialogOpen}>
                <DialogTitle>Choisir les filtres</DialogTitle>
                <DialogContent>
                    <Box sx={{ width: '400px' }}>
                        <Grid container spacing={2}>
                        {
                            filtersProps.map((filterProps, index) => 
                                <>
                                    <Grid key={`grid-label-${index}`} xs={8}><Typography variant='overline'>{filterProps.filterLabel}</Typography></Grid>
                                    <Grid key={`grid-display-${index}`} xs={4}>{filterProps.filterDisplay}</Grid>
                                </>
                            )
                        }
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FilterDialog;