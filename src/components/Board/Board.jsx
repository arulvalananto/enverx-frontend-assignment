import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';

import './Board.css';
import constants from '../../common/constants';
import BoardSection from '../BoardSection/BoardSection';
import { calculateTotal, filterTransaction } from '../../common/helpers';
import { transactionsSelector } from '../../store/reducers/transactions';
import BoardTile from '../BoardTile/BoardTile';

const Board = () => {
    const { transactions, isLoading } = useSelector(transactionsSelector);

    const incomeList = useMemo(
        () => filterTransaction(transactions, 'income'),
        [transactions]
    );

    const expenseList = useMemo(
        () => filterTransaction(transactions, 'expense'),
        [transactions]
    );

    const totalIncome = useMemo(
        () => calculateTotal(transactions, 'income'),
        [transactions]
    );

    const totalExpense = useMemo(
        () => calculateTotal(transactions, 'expense'),
        [transactions]
    );

    if (isLoading) {
        return null;
    }

    return (
        <Box className="board">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <BoardTile
                        title="Income"
                        className="income"
                        amount={`+ $ ${totalIncome}`}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BoardTile
                        title="Expense"
                        className="expense"
                        amount={`- $ ${Math.abs(totalExpense)}`}
                    />
                </Grid>
            </Grid>
            <Grid container marginTop={1} gap={1}>
                <BoardSection
                    title="Recent Transactions"
                    transactions={transactions}
                    noContentMessage={constants.TRANSACTIONS_NO_CONTENT_MESSAGE}
                />
            </Grid>
            <Grid container marginTop={1} gap={1}>
                <BoardSection
                    title="Recent Income"
                    transactions={incomeList}
                    noContentMessage={constants.INCOME_NO_CONTENT_MESSAGE}
                />
            </Grid>
            <Grid container marginTop={1} gap={1}>
                <BoardSection
                    title="Recent Expenses"
                    transactions={expenseList}
                    noContentMessage={constants.EXPENSE_NO_CONTENT_MESSAGE}
                />
            </Grid>
        </Box>
    );
};

export default Board;
