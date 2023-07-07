import React from 'react';
import { Grid } from '@mui/material';

import CustomTable from '../Table/Table';

const BoardSection = ({ title, transactions, noContentMessage }) => {
    return (
        <Grid
            className="transactions"
            item
            xs={12}
            width="100%"
            minHeight={100}
            maxHeight={500}
        >
            <h4 className="section-title">{title}</h4>
            {transactions.length ? (
                <CustomTable rows={transactions.slice(0, 5)} />
            ) : (
                <p className="no-transaction">T{noContentMessage}</p>
            )}
        </Grid>
    );
};

export default BoardSection;
