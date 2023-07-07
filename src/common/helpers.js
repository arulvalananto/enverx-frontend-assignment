export const calculateTotal = (transactions, type) => {
    return transactions.reduce(
        (prev, curr) => (curr.type === type ? prev + curr.amount : prev),
        0
    );
};

export const filterTransaction = (transactions, type) => {
    return transactions.filter((transaction) => transaction.type === type);
};
