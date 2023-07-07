import React from 'react';
import { Grid, Typography } from '@mui/material';

import constants from '../../common/constants';
import AddTransactionsDialog from '../AddTransactionDialog/AddTransactionsDialog';

const Navbar = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding={2}
        >
            <Typography variant="h4">{constants.APP_NAME}</Typography>
            <AddTransactionsDialog />
        </Grid>
    );
};

export default Navbar;
