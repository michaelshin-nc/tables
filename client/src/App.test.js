import React from 'react';
import { shallow, mount } from 'enzyme';
import {Provider} from "react-redux";
import configureMockStore from 'redux-mock-store';
import { initialState } from './redux/store/initialState';
import TableComponent from "./components/TableComponent";
import App from './App';

describe('Table Component Test', () => {
    const mockStore = configureMockStore([])(initialState);

    it('should render 3 TableComponents', () => {
        const wrapper = mount(
            <Provider store={mockStore}>
                <App />
            </Provider>
        );
        expect(wrapper.find(TableComponent).length).toEqual(3)
    });
});