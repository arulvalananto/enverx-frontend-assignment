import { Provider, useDispatch } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';

import store from '../../store';
import AddTransactionsDialog from './AddTransactionsDialog';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

describe('AddTransactionsDialog', () => {
    it('should open dialog box', () => {
        render(
            <Provider store={store}>
                <AddTransactionsDialog />
            </Provider>
        );

        const addButton = screen.getByRole('button', {
            name: /add/i,
        });

        fireEvent.click(addButton);

        const dialogTitle = screen.getByRole('heading', {
            name: /add/i,
        });

        expect(dialogTitle).toBeInTheDocument();
    });

    it('should not call add transaction if I have not entered category', async () => {
        const dispatch = jest.fn();
        useDispatch.mockReturnValue(dispatch);

        render(
            <Provider store={store}>
                <AddTransactionsDialog />
            </Provider>
        );

        const addButton = screen.getByRole('button', { name: 'Add' });
        fireEvent.click(addButton);

        const descriptionInput = screen.getByLabelText(/Description/i);

        fireEvent.change(descriptionInput, {
            target: { name: 'description', value: 'Test transaction' },
        });

        const amountInput = screen.getByLabelText(/Amount/i);
        fireEvent.change(amountInput, {
            target: { name: 'amount', value: 100 },
        });

        const submitButton = screen.getByRole('button', { name: 'Add' });
        fireEvent.click(submitButton);

        await expect(dispatch).not.toHaveBeenCalled();
    });
});
