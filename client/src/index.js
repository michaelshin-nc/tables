import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import initStore from './redux/store/initStore'
import {updateTable} from './redux/actions/actions';
import { initialState } from './redux/store/initialState';

const store = initStore();
store.dispatch(updateTable(initialState.table));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app')
);

