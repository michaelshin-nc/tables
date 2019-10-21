import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import initStore from './redux/store/initStore'
import {updateTable} from './redux/actions/actions';
import { initialState } from './redux/store/initialState';
import {getCookie} from "./util/cookie";

const store = initStore();
if(getCookie('threeTables')) {
    store.dispatch(updateTable(JSON.parse(getCookie('threeTables'))));
} else {
    store.dispatch(updateTable(initialState.table));
}


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app')
);

