import React, { useState } from "react";
import TableRow from "./TableRow";
import TableHeadItem from "./TableHead";
import Pagination from './Pagination'
import './table.css';

const Table = ({ columns, data, customClass }) => {
    const { items, requestSort, sortConfig } = useSortableData(data);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(3);

    // current page data
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentPageData = items.slice(indexOfFirstData, indexOfLastData);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
      };

    return (
        <>
            <table className='table-wrapper'>
                <thead>
                    <tr>
                        {columns.map((col) => {
                            return <TableHeadItem key={col?.accessor} column={col}
                            tableHeadCallbacks={{
                                requestSort,
                                getClassNamesFor,
                            }} />;
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


const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);
  
    const sortedItems = React.useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key) => {
      let direction = 'ascending';
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === 'ascending'
      ) {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort, sortConfig };
  };