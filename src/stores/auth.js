import {createSlice} from '@reduxjs/toolkit'

export const auth = createSlice({
    name: 'auth',
    initialState : {
        user: null,
        token: null
    },
    reducers:{
        setUser:(state, action) => void(state.user = action.payload),
        setToken:(state, action) => void(state.token = action.payload),
    }

})

export const { setUser, setToken} = auth.actions

export default auth.reducer