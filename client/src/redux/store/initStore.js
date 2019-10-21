import { createStore, combineReducers } from 'redux';
import tableInputReducer from '../reducers/tableInputs';

export default () => {
    return createStore(
        combineReducers({
            table: tableInputReducer,
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
};
