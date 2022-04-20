import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import thankMiddleware from 'redux-thunk';
import userReducer from "./reducer";

let rootReducer = combineReducers({
    users: userReducer,
})
const store: Store<AppStateType, any> = createStore(rootReducer, applyMiddleware(thankMiddleware))

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store

// @ts-ignore
window.store = store;