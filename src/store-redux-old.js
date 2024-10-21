import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension'; // OLD version

import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

// объединение редьюсеров
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

// создание хранилища
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) // OLD version
);

export default store;
