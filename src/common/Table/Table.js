import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";
import TableHead from "./TableHead";
import Pagination from './Pagination'
import './table.css';

const Table = ({ columns, data, customClass }) => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(3);
    const [filterValues, setFilterValues] = useState({});
    const [sortedData, setSortedData] = useState(data);
    const [currentPageData, setCurrentPageData] = useState([]);
    const [sortConfig, setSortConfig] = useState(null);
    
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
    // const { items, requestSort, sortConfig } = useSortableData(data);
    //===========
  
    function sortableData (data) {
        
          let sortableItems = [...data];
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
    
        setSortedData(sortableItems);

        // return { requestSort };
    }

    // const { requestSort } = sortableData(data);
    //============

    // current page data
    let indexOfLastData = currentPage * dataPerPage;
    let indexOfFirstData = indexOfLastData - dataPerPage;
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
        if (!filters)
            return true;
        const filterKeys = Object.keys(filters);

        if(filterKeys?.length === 0)
            return true;
        
        for (let filterKey of filterKeys) {
          if (row[filterKey]?.toLowerCase()?.includes(filters[filterKey]?.toLowerCase())) {
            return true;
          }
        }
        return false;
      }

      useEffect(() => {
        sortableData(data);
          
      }, [sortConfig]);
      
    //   useEffect(() => {
    //     sortableData(data);
          
    //   }, [sortedData]);

      useEffect(() => {
          const filteredData = sortedData
          .filter((rowData) => {
            return filterRowData(rowData, filterValues)
            })
            .slice(indexOfFirstData, indexOfLastData);
          setCurrentPageData(filteredData);
      }, [sortedData])
      
      useEffect(() => {
          indexOfFirstData = 0;
          indexOfLastData = dataPerPage;
          const filteredData = sortedData
            .filter((rowData) => {
                return filterRowData(rowData, filterValues)
                })
            .slice(indexOfFirstData, indexOfLastData);
          setCurrentPageData(filteredData);
      }, [filterValues])
      
    useEffect(() => {
        setCurrentPageData(sortedData.slice(indexOfFirstData, indexOfLastData));
      }, [ currentPage])

      useEffect(() => {
        //   const filteredData = items.filter((rowData) => {
        //         return filterRowData(rowData, filterValues)
        //     });
        // currentPageData = items.slice(indexOfFirstData, indexOfLastData);
        // setSortedData(items); 
        
        sortableData(data);
          setCurrentPageData(sortedData.slice(indexOfFirstData, indexOfLastData));
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
