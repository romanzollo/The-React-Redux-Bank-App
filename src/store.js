import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
};

const initialStateCustomer = {
    fullName: '',
    nationalId: '',
    createdAt: '',
};

function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case 'account/deposit':
            return { ...state, balance: state.balance + action.payload };

        case 'account/withdraw':
            return { ...state, balance: state.balance - action.payload };

        case 'account/requestLoan':
            if (state.loan > 0) return state;
            // LATER
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };
        case 'account/payLoan':
            return {
                ...state,
                loan: 0,
                loanPurpose: '',
                balance: state.balance - state.loan,
            };

        default:
            return state;
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalId: action.payload.nationalId,
                createdAt: action.payload.createdAt,
            };

        case 'customer/updateName':
            return { ...state, fullName: action.payload };

        default:
            return state;
    }
}

// объединение редьюсеров
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});
const store = createStore(rootReducer);

/* OLD */
// const ACCOUNT_DEPOSIT = 'account/deposit';
// const ACCOUNT_WITHDRAW = 'account/withdraw';
// const ACCOUNT_REQUEST_LOAN = 'account/requestLoan';
// const ACCOUNT_PAY_LOAN = 'account/payLoan';

function deposit(amount) {
    return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
    return { type: 'account/withdraw', payload: amount };
}

function requestLoan(amount, purpose) {
    return {
        type: 'account/requestLoan',
        payload: { amount, purpose },
    };
}

function payload() {
    return {
        type: 'account/payLoan',
    };
}

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, 'Buy a new car'));
console.log(store.getState());

store.dispatch(payload());
console.log(store.getState());

function createCustomer(fullName, nationalId) {
    return {
        type: 'customer/createCustomer',
        // new Date() является побочным эффектом, а функции редьюсера должны быть чистыми, но для примера можно оставить
        //
        // но в реальных проектах так делать не следует
        payload: { fullName, nationalId, createdAt: new Date().toISOString() },
    };
}

function updateName(fullName) {
    return {
        type: 'customer/updateName',
        payload: fullName,
    };
}

store.dispatch(createCustomer('Roman Zlagodukhin', '23542324'));
store.dispatch(deposit(500));
console.log(store.getState());
