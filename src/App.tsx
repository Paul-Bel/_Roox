import React, {ChangeEvent, useState} from 'react';
import style from './App.module.scss';
import {Provider} from "react-redux";
import store from './Redux/store';
import {FilterNav} from "./common/components/Filter/FilterNav";
import {ListUsers} from "./UsersList/ListUsers";

function App() {

    return (
        <Provider store={store}>
            <div className={style.App}>
                <FilterNav/>
                <ListUsers/>
            </div>
        </Provider>
    );
}

export default App;
