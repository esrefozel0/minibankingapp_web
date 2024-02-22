import {configureStore} from '@reduxjs/toolkit'

import counterReducer from "./stores/counter"
import authReducer from "./stores/auth"

export default configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    }
})