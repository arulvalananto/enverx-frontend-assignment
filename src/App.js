import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import './App.css';
import Board from './components/Board/Board';
import Navbar from './components/Navbar/Navbar';
import { getTransactionsFetch } from './store/reducers/transactions';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTransactionsFetch());
    }, [dispatch]);

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <Grid container direction="column" width="100%" height="100%">
                <Navbar />
                <Board />
            </Grid>
            <Toaster />
        </Box>
    );
};

export default App;
