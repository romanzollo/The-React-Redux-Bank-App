import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fullName: '',
    nationalId: '',
    createdAt: '',
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        createCustomer: {
            // подготавливаем action.payload к использованию в reducer
            prepare(fullName, nationalId) {
                return {
                    payload: {
                        fullName,
                        nationalId,
                        // new Date() является побочным эффектом, а функции редьюсера должны быть чистыми
                        // поэтому функция  prepare идеальное место для использования побочных эффектов !!!
                        createdAt: new Date().toISOString(),
                    },
                };
            },

            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalId = action.payload.nationalId;
                state.createdAt = action.payload.createdAt;
            },
        },
        updateName(state, action) {
            state.fullName = action.payload;
        },
    },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
