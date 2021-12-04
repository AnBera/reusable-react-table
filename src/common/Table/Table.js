import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";
import TableHead from "./TableHead";
import Pagination from './Pagination'
import './table.css';

const Table = ({ columns, data, customClass }) => {
    const { items, requestSort, sortConfig } = useSortableData(data);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(3);
    const [filterValues, setFilterValues] = useState({});
    const [sortedData, setSortedData] = useState(items);
    const [currentPageData, setCurrentPageData] = useState([]);

    // current page data
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    // let currentPageData = items.slice(indexOfFirstData, indexOfLastData);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
      };
    
      const onChangeFilterText = (filterValue, accessor) => {
        setFilterValues ({
            ...filterValues,
            [accessor]: filterValue,
        })
      };

      function filterRowData(row, filters) {
        const filterKeys = Object.keys(filters);
        
        for (let filterKey of filterKeys) {
          if (row[filterKey]?.toLowerCase()?.includes(filters[filterKey]?.toLowerCase())) {
            return true;
          }
        }
        return false;
      }

    //   useEffect(() => {
    //       const filteredData = currentPageData.filter((rowData) => {
    //         return filterRowData(rowData, filterValues)
    //     });
    //       setCurrentPageData(filteredData);
    //   }, [items])
      
    useEffect(() => {
        setCurrentPageData(items.slice(indexOfFirstData, indexOfLastData));
      }, [items, currentPage])

      useEffect(() => {
        //   const filteredData = items.filter((rowData) => {
        //         return filterRowData(rowData, filterValues)
        //     });
        // currentPageData = items.slice(indexOfFirstData, indexOfLastData);
        // setSortedData(items); 
        
          setCurrentPageData(items.slice(indexOfFirstData, indexOfLastData));
      }, [])

    return (
        <>
            <table className='table-wrapper'>
                <thead>
                    <tr>
                        {columns.map((col) => {
                            return (
                            <TableHead key={col?.accessor} column={col}
                            filter={filterValues[col?.accessor]}
                            tableHeadCallbacks={{
                                requestSort,
                                getClassNamesFor,
                                onChangeFilterText,
                            }} />);
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