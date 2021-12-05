import React from "react";

const TableHead = ({ column, tableHeadCallbacks, filter }) => {
    return (
        <td title={column?.accessor}>
            {column?.header}
            {column?.searchable && (
                <input
                    className="filter-text-input"
                    type="text"
                    value={filter}
                    onChange={e => tableHeadCallbacks?.onChangeFilterText(e.target.value, column?.accessor)} />
            )}
            {column?.sortable && (
                <a
                    onClick={() => tableHeadCallbacks?.requestSort?.(column?.accessor)}
                    className={`sort-button ${tableHeadCallbacks?.getClassNamesFor?.(column?.accessor)}`}
                />
            )}

        </td>
    );
};

export default TableHead;