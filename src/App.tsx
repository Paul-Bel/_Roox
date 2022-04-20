import React from 'react';
import style from './App.module.scss';
import {MainContainer} from "./MainContainer/MainContainer";
import {Provider} from "react-redux";
import store from './Redux/store';
import {UserProfile} from "./UserProfile/UserProfile";

function App() {
  return (
      <Provider store={store}>
    <div className={style.App}>
      <MainContainer/>
    </div>
      </Provider>
  );
}

export default App;
