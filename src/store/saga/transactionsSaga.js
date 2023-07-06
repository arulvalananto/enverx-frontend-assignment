import { toast } from 'react-hot-toast';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { addDoc, collection, getDocs } from 'firebase/firestore';

import { db } from '../../firebase';
import constants from '../../common/constants';
import {
    addTransactionFailed,
    addTransactionSuccess,
    getTransactionsFailed,
    getTransactionsSuccess,
} from '../reducers/transactions';

function* loadTransactionsFetch() {
    try {
        const querySnapshot = yield call(() =>
            getDocs(collection(db, constants.TRANSACTION_DB_PATH))
        );

        const transactions = [];
        if (querySnapshot) {
            querySnapshot?.forEach((doc) => {
                const transaction = doc.data();
                if (transaction) transactions.push(transaction);
            });
        }

        transactions.sort((a, b) => b.updatedAt.seconds - a.updatedAt.seconds);
        yield put(getTransactionsSuccess(transactions));
    } catch (error) {
        console.error(error.message);
        yield put(getTransactionsFailed());
    }
}

function* loadAddTransactionInitiate({ payload }) {
    try {
        const docRef = collection(db, constants.TRANSACTION_DB_PATH);

        yield call(() => addDoc(docRef, payload));

        yield put(addTransactionSuccess({ ...payload }));
    } catch (error) {
        yield put(addTransactionFailed());
        if (error instanceof Error) {
            toast.error(error.message);
        }
    }
}

function* watchAll() {
    yield all([
        takeEvery('transactions/getTransactionsFetch', loadTransactionsFetch),
        takeEvery(
            'transactions/addTransactionInitiate',
            loadAddTransactionInitiate
        ),
    ]);
}

export default watchAll;
