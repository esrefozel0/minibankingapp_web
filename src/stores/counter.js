import {createSlice} from '@reduxjs/toolkit'

export const counter = createSlice({
    name: 'counter',
    initialState : {
        accountList: [],
        transactionList: [],
        account: {},
    },
    reducers:{
        setAccountList:(state, action) => void(state.accountList = action.payload),
        setTransactionList: (state, action) => void(state.transactionList = action.payload),
        setAccount: (state, action) => void(state.account = action.payload),
    }

})

export const { setAccountList, setTransactionList, setAccount } = counter.actions

export default counter.reducer