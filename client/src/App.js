import React from 'react';
import { connect } from 'react-redux';
import TableComponent from './components/TableComponent'
import styled from "styled-components";
import { updateTable } from "./redux/actions/actions";

// Styled
const MainView = styled.div`
            display: grid;
            grid-gap: 1rem;
            grid-template-columns: ${props => props.tableWidthValues.first}% ${props => props.tableWidthValues.second}% ${props => props.tableWidthValues.third}%; 
            
            @media screen and (max-width: 900px){
                grid-template-columns: 
                ${props => props.tableWidthValues.first + (props.tableWidthValues.third * (props.tableWidthValues.first / (props.tableWidthValues.first + props.tableWidthValues.second)))}% 
                ${props => props.tableWidthValues.second  + (props.tableWidthValues.third * (props.tableWidthValues.second / (props.tableWidthValues.first + props.tableWidthValues.second)))}% 
                ${props => props.tableWidthValues.third }%; 
                .index_2 { display: none; }
            }
           
            @media screen and (max-width: 600px){
                grid-template-columns: 1fr;
                grid-template-rows: auto;
            }
`;

// React Component
const App = (props) => {
    const tableWidthValues = {
        first: props.table[0].width,
        second: props.table[1].width,
        third: props.table[2].width,
    };

    return (
        <MainView tableWidthValues={tableWidthValues}>
            {props.table.map((el, index) => <TableComponent key={index} tableIndex={index}/>)}
        </MainView>
    );
};

const mapStateToProps = (state) => ({ table: state.table });
const mapDispatchToProps = (dispatch) => ({updateTable: (store) => dispatch(updateTable(store))});
export default connect(mapStateToProps, mapDispatchToProps)(App);