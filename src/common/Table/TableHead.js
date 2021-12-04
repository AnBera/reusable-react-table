import React from "react";

const TableHeadItem = ({ column, tableHeadCallbacks }) => {
    return (
        <td title={column?.accessor}>
            {column?.header}
            {column?.sortable && (
                <a
                    onClick={() => tableHeadCallbacks?.requestSort?.(column?.accessor)}
                    className={tableHeadCallbacks?.getClassNamesFor?.(column?.accessor)}
                />
            )}

        </td>
    );
};

export default TableHeadItem;