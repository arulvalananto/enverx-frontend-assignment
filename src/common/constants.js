const constants = {
    APP_NAME: 'statement',
    ADD_TRANSACTION_BUTTON_TEXT: 'Add',
    TRANSACTION_DB_PATH: 'transactions',
    TRANSACTION_FORM_VALIDATION: {
        DESCRIPTION:
            'Please provide a description within 1 to 50 characters long',
        CATEGORY: 'Please select most relevant category',
        AMOUNT: 'Please ensure that the amount does not surpass your income threshold',
    },
    SUCCESS_MESSAGE: {
        TRANSACTION_ADDED: 'new transaction added',
    },
    TRANASACTIONS_NO_CONTENT_MESSAGE:
        'There is no record of any transactions found.',
    INCOME_NO_CONTENT_MESSAGE: 'There is no record of any income found.',
    EXPENSE_NO_CONTENT_MESSAGE: 'There is no record of any expenses found.',
};

export default constants;
