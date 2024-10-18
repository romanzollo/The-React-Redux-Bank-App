import { combineReducers, createStore } from 'redux';

import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

// объединение редьюсеров
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

// создание хранилища
const store = createStore(rootReducer);

export default store;
