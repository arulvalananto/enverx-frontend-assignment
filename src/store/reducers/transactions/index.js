/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    transactions: [],
    isLoading: true,
    addTransationIsLoading: false,
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: initialState,
    reducers: {
        getTransactionsFetch: (state) => {
            state.isLoading = true;
        },
        getTransactionsSuccess: (state, action) => {
            state.isLoading = false;
            state.transactions = action.payload;
        },
        getTransactionsFailed: (state) => {
            state.isLoading = false;
        },
        addTransactionInitiate: (state, _action) => {
            state.addTransationIsLoading = true;
        },
        addTransactionSuccess: (state, action) => {
            const newTransactions = [
                ...state.transactions,
                action.payload,
            ].sort((a, b) => b.createdAt - a.createdAt);
            state.transactions = newTransactions;

            state.addTransationIsLoading = false;
        },
        addTransactionFailed: (state) => {
            state.addTransationIsLoading = false;
        },
    },
});

export const transactionsSelector = (state) => state.transactions;
export const {
    getTransactionsFetch,
    getTransactionsSuccess,
    getTransactionsFailed,
    addTransactionInitiate,
    addTransactionSuccess,
    addTransactionFailed,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
