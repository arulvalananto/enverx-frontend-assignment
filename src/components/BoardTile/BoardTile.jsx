import React from 'react';
import { Grid, Typography } from '@mui/material';

const BoardTile = ({ title, amount, className }) => {
    return (
        <Grid className="section">
            <Typography variant="p" className="section-title">
                {title}
            </Typography>
            <Typography
                variant="p"
                className={`section-amount ${className}`}
                sx={{
                    '@media (max-width: 780px)': {
                        fontSize: '1.5rem',
                    },
                }}
            >
                {amount}
            </Typography>
        </Grid>
    );
};

export default BoardTile;
