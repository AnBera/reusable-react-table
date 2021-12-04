import React, { useState } from "react";
import TableRow from "./TableRow";
import TableHeadItem from "./TableHead";
import Pagination from './Pagination'
import './table.css';

const Table = ({ columns, data, customClass }) => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(3);

    // current page data
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentPageData = data.slice(indexOfFirstData, indexOfLastData);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <table className='table-wrapper'>
                <thead>
                    <tr>
                        {columns.map((col) => {
                            return <TableHeadItem key={col?.accessor} item={col?.header} />;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((rowData) => {
                        return <TableRow columns={columns} rowData={rowData} />
                        // return (
                        //     <tr>
                        //         {columns.map((col) => {
                        //             return <td key={col?.accessor}> {rowData[col?.accessor]} </td>;
                        //         })}
                        //     </tr>
                        // )
                    })}

                </tbody>
            </table>
            <Pagination
                dataPerPage={dataPerPage}
                totalDataCount={data.length}
                paginate={paginate}
            />
        </>
    );
};

export default Table;