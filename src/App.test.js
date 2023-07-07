import React from 'react';
import { render } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';

import App from './App';
import store from './store';
import { getTransactionsFetch } from './store/reducers/transactions';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

describe('App', () => {
    it('should call transactions list on mount', () => {
        const dispatch = jest.fn();
        useDispatch.mockReturnValue(dispatch);
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        expect(dispatch).toHaveBeenCalledWith(getTransactionsFetch());
    });
});
