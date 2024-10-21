import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false, // индикатор загрузки
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance = state.balance + action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload;
        },
        requestLoan: {
            // т.к. изначально reducer requestLoan принимает только один аргумент (amount) вместо нужных двух (amount, purpose) в данном случае, или более если нужно
            // поэтому добавляем встроенную функцию "prepare" для создания нового обьекта который станет обьектом payload в reducer
            // другими словами подготовливаем новый обьект action.payload к использованию в reducer
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount,
                        purpose,
                    },
                };
            },

            // теперь action.payload подготовлен и имеет обьект с атрибутами amount и purpose
            reducer(state, action) {
                if (state.loan > 0) return;

                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + action.payload.amount;
            },
        },
        payLoan(state) {
            // это строка обязательно должна быть раньше чем обнуление state.loan = 0
            state.balance = state.balance - state.loan;
            state.loan = 0;
            state.loanPurpose = '';
        },
    },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

// функция-редьюсер
// export default function accountReducer(state = initialState, action) {
//     switch (action.type) {
//         case 'account/deposit':
//             return {
//                 ...state,
//                 balance: state.balance + action.payload,
//                 isLoading: false, // выключаем индикатор загрузки
//             };

//         case 'account/withdraw':
//             return { ...state, balance: state.balance - action.payload };

//         case 'account/requestLoan':
//             if (state.loan > 0) return state;
//             // LATER
//             return {
//                 ...state,
//                 loan: action.payload.amount,
//                 loanPurpose: action.payload.purpose,
//                 balance: state.balance + action.payload.amount,
//             };
//         case 'account/payLoan':
//             return {
//                 ...state,
//                 loan: 0,
//                 loanPurpose: '',
//                 balance: state.balance - state.loan,
//             };
//         case 'account/convertingCurrency':
//             return {
//                 ...state,
//                 isLoading: true,
//             };

//         default:
//             return state;
//     }
// }

// // action creators
// export function deposit(amount, currency) {
//     if (currency === 'USD') return { type: 'account/deposit', payload: amount };

//     // THUNK function (middleware)
//     return async function (dispatch, getState) {
//         // включаем индикатор загрузки
//         dispatch({ type: 'account/convertingCurrency' });

//         // API call
//         const res = await fetch(
//             `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//         );

//         const data = await res.json();

//         // сконвертированное значение
//         const convertedAmount = data.rates.USD;

//         dispatch({ type: 'account/deposit', payload: convertedAmount });
//     };
// }

// export function withdraw(amount) {
//     return { type: 'account/withdraw', payload: amount };
// }

// export function requestLoan(amount, purpose) {
//     return {
//         type: 'account/requestLoan',
//         payload: { amount, purpose },
//     };
// }

// export function payLoan() {
//     return {
//         type: 'account/payLoan',
//     };
// }
