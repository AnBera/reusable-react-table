import React from 'react';
import Table from '../common/Table/Table';
import tableData from './tableData.json';
import './tableExample.css';

const ageFormatter = (rowData, colName) => {
    if (rowData[colName] > 50) {
        return (
            <td style={{ backgroundColor: '#E7717D' }}>
                {rowData[colName]}
            </td>
        )
    } else {
        return (
            <td style={{ backgroundColor: '#AFD275' }}>
                {rowData[colName]}
            </td>
        )
    }
}

const mailFormatter = (rowData, colName) => {
    return (
        <td>
            <a href={`mailto:${rowData[colName]}`}>
                {rowData[colName]}
            </a>
            
        </td>
    )
}

const mailTextboxFormatter = (rowData, colName, rowIndex) => {
    return (
        <td>
            <button>
            {rowData[colName]}
            </button>
            
        </td>
    )
}

const nameFormatter = (rowData, colName, rowIndex) => {
    return (
        <td>
            <img style={{height: '1.5em'}} src={`https://randomuser.me/api/portraits/men/${rowIndex}.jpg`} />
            {' '}
            {rowData[colName]}
        </td>
    )
}

const coulmnsDef1 = {
    columns: [
        {
            header: 'Name(First & Last)',
            accessor: 'name',
            width: 80,
            sortable: true,
            searchable: true,
        },
        {
            header: 'Email',
            accessor: 'email',
            width: 80,
            sortable: true,
            searchable: true,
        },
        {
            header: 'Age',
            accessor: 'age',
            width: 80,
        }
    ],
    pagination: true,
    dataPerPage: 3,
};

const coulmnsDef2 = {
    columns: [
        {
            header: 'Name(First & Last)',
            accessor: 'name',
            width: 80,
            sortable: true,
            searchable: true,
            cellFormatter: nameFormatter,
        },
        {
            header: 'Email',
            accessor: 'email',
            cellFormatter: mailFormatter,
        },
        {
            header: 'Age',
            accessor: 'age',
            width: 80,
            cellFormatter: ageFormatter,
        }
    ]
};
const coulmnsDef3 = {
    columns: [
        {
            header: 'Name(First & Last)',
            accessor: 'name',
            width: 80,
            sortable: true,
            searchable: true,
        },
        {
            header: 'Email',
            accessor: 'email',
        },
        {
            header: 'Age',
            accessor: 'age',
            width: 80,
        }
    ],
    pagination: true,
    dataPerPage: 4,
};

const coulmnsDef4 = {
    columns: [
        {
            header: 'Name(First & Last)',
            accessor: 'name',
            width: 80,
            sortable: true,
            searchable: true,
        },
        {
            header: 'Email',
            accessor: 'email',
            width: 80,
            searchable: true,
            cellFormatter: mailTextboxFormatter,
        },
        {
            header: 'Age',
            accessor: 'age',
            width: 80,
            cellFormatter: ageFormatter,
        }
    ],
};


function TableExample() {
    return (
        <>
            <section>
                <h3> Full Width Table</h3>
                <Table data={tableData} definition={coulmnsDef1} />
            </section>

            <section className="half-left">
                <h3> Half width Left Push Table</h3>
                <Table data={tableData} definition={coulmnsDef2} />
            </section>

            <br /><br /><br />
            <section className="middle">
                <h3> Half width Middle aligned Table</h3>
                <Table data={tableData} definition={coulmnsDef3} />
            </section>

            <br /><br />
            <section className="half-right">
                <h3> Half width Right Push Table</h3>
                <Table data={tableData} definition={coulmnsDef4} />
            </section>
        </>
    );
}

export default TableExample;