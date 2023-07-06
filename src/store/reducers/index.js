import { combineReducers } from '@reduxjs/toolkit';

import transactions from './transactions';

const rootReducer = combineReducers({
    transactions: transactions,
});

export default rootReducer;
