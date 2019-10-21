import React, { useState, useEffect} from 'react';
import styled from "styled-components";
import {updateTable} from "../redux/actions/actions";
import {connect} from "react-redux";
import { validateAndUpdateWidth, validateInputs } from '../util/validate';
import {setCookie} from "../util/cookie";

// Styled
const Button = styled.button`
            padding: 0.5rem;
            margin-right: 0.5rem;
        `;
const TableInputView = styled.div`
            margin: 1rem .5rem;
            @media screen and (max-width: 900px){
                div:nth-child(5){display: none;}
            }
        `;
const InputEntries = styled.div`
            margin-top: 1rem;
        `;
const Span = styled.span`
            color: ${props => props.color};
        `;

// REACT Component using Hooks
const TableInput = ({table, tableIndex, updateTable}) => {
    const [numberStartN, setNumberStartN] = useState(table[tableIndex].numberStartN);
    const [numberIncreaseByX, setNumberIncreaseByX] = useState(table[tableIndex].numberIncreaseByX);
    const [numberEndM, setNumberEndM] = useState(table[tableIndex].numberEndM,);
    const [width, setWidth] = useState(table[tableIndex].width);
    const [direction, setDirection] = useState(table[tableIndex].direction);

    const handleUpdate = () => {
        const newTable = [...table];
        const updatedWidth = validateAndUpdateWidth({newTable, tableIndex, width});

        newTable[tableIndex] = {
            color: table[tableIndex].color,
            width: updatedWidth,
            isConfigurationOpen: false,
            numberStartN: parseInt(numberStartN),
            numberIncreaseByX: parseInt(numberIncreaseByX),
            numberEndM: parseInt(numberEndM),
            direction,
        };
        if(validateInputs({ numberStartN, numberIncreaseByX, numberEndM }) !== 'pass') {
            alert(validateInputs({ numberStartN, numberIncreaseByX, numberEndM }));
        } else {
            setCookie('threeTables', JSON.stringify(newTable), 3);
            updateTable(newTable)
        }
    };

    const handleCancel = (index) => {
        const prevIsConfigurationOpen = table[index].isConfigurationOpen;
        const newTable = [...table];
        newTable[index].isConfigurationOpen = !prevIsConfigurationOpen;
        setCookie('threeTables', JSON.stringify(newTable), 3);
        updateTable(newTable);
    };

    return (
        <TableInputView>
            <form>
                <InputEntries>Table: <strong><Span color={table[tableIndex].color}>{table[tableIndex].color.toUpperCase()}</Span></strong></InputEntries>
                <InputEntries>N = <input type="number" name="numberStartN" value={numberStartN} onChange={e => setNumberStartN(e.target.value)}/></InputEntries>
                <InputEntries>X = <input type="number" name="numberIncreaseByX" value={numberIncreaseByX} onChange={e => setNumberIncreaseByX(e.target.value)}/></InputEntries>
                <InputEntries>M = <input type="number" name="numberEndM" value={numberEndM} onChange={e => setNumberEndM(e.target.value)}/></InputEntries>
                <InputEntries>W = <input type="number" name="width" value={width} onChange={e => setWidth(e.target.value)}/>%</InputEntries>
                <InputEntries>
                    <label>D =
                        <select name="direction" value={direction} onChange={e => setDirection(e.target.value)}>
                            <option value="LTR-UP">LTR-UP</option>
                            <option value="RTL-UP">RTL-UP</option>
                        </select>
                    </label>
                </InputEntries>
                <InputEntries>
                    <Button type="button" onClick={handleUpdate}>OK</Button>
                    <Button type="button" onClick={() => {handleCancel(tableIndex)}}>CANCEL</Button>
                </InputEntries>
            </form>
        </TableInputView>
    );
};

const mapStateToProps = (state) => ({ table: state.table });
const mapDispatchToProps = (dispatch) => ({updateTable: (store) => dispatch(updateTable(store))});
export default connect(mapStateToProps, mapDispatchToProps)(TableInput);