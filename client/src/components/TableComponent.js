import React from 'react';
import styled from "styled-components";
import TableInput from './TableInput';
import {updateTable} from "../redux/actions/actions";
import {connect} from "react-redux";

// Styled
const padding = '.5rem';
const TableView = styled.div`
            border: 1px solid ${props => props.color};
            padding: ${padding};
        `;
const Table = styled.table`
            border-collapse: collapse;
            width: 100%;
        `;
const TdHasValue = styled.td`
            border: 1px solid #888888;
            padding: ${padding};
        `;
const TdHasNoValue = styled.td`
            border: 1px solid #888888;
            background: #B8B8B8;
            padding: ${padding};
        `;
const TableWhiteSpace = styled.div`
            margin-top: .5rem;
        `;
const Button = styled.button`
            padding: ${padding};
        `;
const TableViewWidth = styled.div`
            float: right;
            @media screen and (max-width: 900px){
                display: none;
            }
        `;

// Functional Component
const TableComponent = ({table, tableIndex, updateTable}) => {
    const generateEntries = () => {
        const matrix = [];
        let tempMatrix = [];
        let orderCount = 0;
        for (let i = table[tableIndex].numberStartN; i <= table[tableIndex].numberEndM; i += table[tableIndex].numberIncreaseByX) {
            tempMatrix.push(i);
        }
        while (tempMatrix.length > 0) {
            if (table[tableIndex].direction === 'LTR-UP') {
                orderCount % 2 === 0 ? matrix.unshift(tempMatrix.splice(0, 5))
                    : matrix.unshift(tempMatrix.splice(0, 5).reverse());
            } else if (table[tableIndex].direction === 'RTL-UP') {
                orderCount % 2 !== 0 ? matrix.unshift(tempMatrix.splice(0, 5))
                    : matrix.unshift(tempMatrix.splice(0, 5).reverse());
            }
            orderCount++;
        }
        if (matrix[0].length < 5) {
            if (table[tableIndex].direction === 'LTR-UP') {
                matrix[0].push(...new Array(5 - matrix[0].length));
            } else {
                matrix[0].unshift(...new Array(5 - matrix[0].length));
            }
        }
        return matrix;
    };

    const tableEntries = generateEntries().map((elOne, iOne) => <tr key={iOne}>{
        elOne.map((elTwo, iTwo) => elTwo
            ? <TdHasValue key={`${iTwo}max`}>{elTwo}</TdHasValue>
            : <TdHasNoValue key={`${iTwo}max`}>{elTwo}</TdHasNoValue>
        )}
    </tr>);

    const handleConfigure = (index) => {
        const prevIsConfigurationOpen = table[index].isConfigurationOpen;
        const newTable = [...table];
        newTable[index].isConfigurationOpen = !prevIsConfigurationOpen;
        updateTable(newTable);
    };

    return (
        <div className={`index_${tableIndex}`}>
            <div>
                <TableView color={table[tableIndex].color}>
                    <Table>
                        <tbody>{tableEntries}</tbody>
                    </Table>
                    <TableWhiteSpace>
                        <Button onClick={() => {handleConfigure(tableIndex)}}>Configure</Button>
                        <TableViewWidth>{table[tableIndex].width}%</TableViewWidth>
                    </TableWhiteSpace>
                </TableView>
                {table[tableIndex].isConfigurationOpen && <TableInput tableIndex={tableIndex}/>}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({ table: state.table });
const mapDispatchToProps = (dispatch) => ({updateTable: (store) => dispatch(updateTable(store))});
export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);