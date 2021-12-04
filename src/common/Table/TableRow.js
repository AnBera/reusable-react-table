import React from "react";

const TableRow = ({ columns, rowData }) => {
    return (
        <tr>
            {columns.map((col) => {
                if(col?.cellFormatter) {
                    return col.cellFormatter(rowData, col?.accessor);
                } else {
                    return <td key={col?.accessor}> {rowData[col?.accessor]} </td>;
                }
            })}
        </tr>
    );
};

export default TableRow;