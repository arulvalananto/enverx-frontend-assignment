import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';
import transactionsSaga from './saga/transactionsSaga';

const saga = createSagaMiddleware();

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(saga),
});

saga.run(transactionsSaga);

export default store;
