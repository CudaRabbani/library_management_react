import React from 'react';
import _ from 'lodash';

const TableBody = (props) => {
    const {tableData, tableDataExtractor} = props;

    function renderCell(row, column) {
        if (column.content) return column.content(row);
        if(column.type === 'data')
        {
            const rawCellValue = _.get(row, column.data);
            const cellValue = typeof  rawCellValue === 'boolean' ? (rawCellValue ? 'Yes' : 'No') : (rawCellValue);
            return (cellValue);
        }
    }

    return (
        <tbody>
            {tableData.map((row, index)=>(
                <tr key={row._id}>
                    <td>{index+1}</td>
                    {tableDataExtractor.map(column=>(
                        <td key={column.id}>{renderCell(row, column)}</td>
                    ))}
                </tr>
                ))}
        </tbody>
    );
};

export default TableBody;
