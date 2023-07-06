import toast from 'react-hot-toast';
import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    FormControl,
    FormLabel,
    OutlinedInput,
    FormHelperText,
    Select,
    MenuItem,
} from '@mui/material';

import constants from '../../common/constants';
import { calculateTotal } from '../../common/helpers';
import { categories, transactionFields } from '../../common/static';
import {
    addTransactionInitiate,
    transactionsSelector,
} from '../../store/reducers/transactions';

const TRANSACTION_INITIAL_STATE = {
    category: '',
    description: '',
    amount: 0,
};

const TRANSACTION_HELPER_INITAL_STATE = {
    category: '',
    description: '',
    amount: '',
};

const AddTransactionsDialog = () => {
    const dispatch = useDispatch();
    const { transactions } = useSelector(transactionsSelector);

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [transaction, setTransaction] = useState(TRANSACTION_INITIAL_STATE);
    const [helperText, setHelperText] = useState(
        TRANSACTION_HELPER_INITAL_STATE
    );

    const totalIncome = useMemo(
        () => calculateTotal(transactions, 'income'),
        [transactions]
    );

    const totalExpense = useMemo(
        () => calculateTotal(transactions, 'expense'),
        [transactions]
    );

    const handleOpenDialog = () => {
        setIsOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setTransaction(TRANSACTION_INITIAL_STATE);
        setHelperText(TRANSACTION_HELPER_INITAL_STATE);
        setIsOpenDialog(false);
    };

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        setTransaction({
            ...transaction,
            [name.toLowerCase()]: value,
        });
    };

    const isValidTransaction = () => {
        let isValid = true;
        let description = '';
        let amount = '';
        let category = '';

        if (transaction.description?.length > 50 || !transaction.description) {
            description = constants.TRANSACTION_FORM_VALIDATION.DESCRIPTION;
            isValid = false;
        }

        if (
            (+transaction.amount < 0 &&
                Math.abs(+transaction.amount) + Math.abs(totalExpense) >
                    totalIncome) ||
            !transaction.amount
        ) {
            // change income here!
            amount = constants.TRANSACTION_FORM_VALIDATION.AMOUNT;
            isValid = false;
        }

        if (transaction.category?.length > 50 || !transaction.category) {
            category = constants.TRANSACTION_FORM_VALIDATION.CATEGORY;
            isValid = false;
        }

        setHelperText({
            ...helperText,
            description,
            amount,
            category,
        });

        return isValid;
    };

    const addTransaction = async (newTransaction) => {
        try {
            await dispatch(addTransactionInitiate(newTransaction));

            toast.success(constants.SUCCESS_MESSAGE.TRANSACTION_ADDED);
            handleCloseDialog();
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    };

    const handleSubmit = async () => {
        setHelperText(TRANSACTION_HELPER_INITAL_STATE);

        if (isValidTransaction()) {
            const newTransaction = {
                description: transaction.description,
                amount: +transaction.amount,
                type: +transaction.amount > 0 ? 'income' : 'expense',
                category: transaction.category,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await addTransaction(newTransaction);
        }
    };

    return (
        <React.Fragment>
            <Button variant="outlined" size="small" onClick={handleOpenDialog}>
                {constants.ADD_TRANSACTION_BUTTON_TEXT}
            </Button>
            <Dialog
                open={isOpenDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container direction="column" rowGap={2}>
                            <>
                                {transactionFields.map(({ name, type }) => (
                                    <FormControl key={name}>
                                        <FormLabel
                                            htmlFor={name}
                                            required
                                            sx={{ fontSize: '0.8em' }}
                                        >
                                            {name}
                                        </FormLabel>
                                        <OutlinedInput
                                            data-testid={name}
                                            type={type}
                                            size="small"
                                            id={name}
                                            name={name}
                                            required
                                            value={
                                                transaction[name.toLowerCase()]
                                            }
                                            placeholder={`Enter ${name}`}
                                            onChange={handleFieldChange}
                                        />
                                        <FormHelperText id={name}>
                                            {helperText[name.toLowerCase()]}
                                        </FormHelperText>
                                    </FormControl>
                                ))}
                                <FormControl>
                                    <FormControl
                                        sx={{
                                            fontSize: '0.8em',
                                            marginBottom: '0.2rem',
                                            color: 'rgba(0, 0, 0, 0.6)',
                                        }}
                                        required
                                        htmlFor="category"
                                        data-testid="category"
                                    >
                                        Category
                                    </FormControl>
                                    <Select
                                        data-testid="category"
                                        required
                                        size="small"
                                        id="category"
                                        name="category"
                                        value={transaction['category']}
                                        onChange={handleFieldChange}
                                        input={<OutlinedInput size="small" />}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem
                                                id="category"
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText id="category">
                                        {helperText['category']}
                                    </FormHelperText>
                                </FormControl>
                            </>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Grid container columnGap={2} justifyContent="flex-end">
                        <Button
                            onClick={handleCloseDialog}
                            size="small"
                            color="error"
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleSubmit}
                            size="small"
                            color="inherit"
                        >
                            Add
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default AddTransactionsDialog;
