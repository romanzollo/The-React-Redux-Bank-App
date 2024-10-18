const initialStateCustomer = {
    fullName: '',
    nationalId: '',
    createdAt: '',
};

// функция-редьюсер
export default function customerReducer(state = initialStateCustomer, action) {
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

// action creators
export function createCustomer(fullName, nationalId) {
    return {
        type: 'customer/createCustomer',
        // new Date() является побочным эффектом, а функции редьюсера должны быть чистыми, но для примера можно оставить
        //
        // но в реальных проектах так делать не следует
        payload: { fullName, nationalId, createdAt: new Date().toISOString() },
    };
}

export function updateName(fullName) {
    return {
        type: 'customer/updateName',
        payload: fullName,
    };
}
