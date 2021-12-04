import logo from './logo.svg';
import './App.css';
import Table from './common/Table/Table';

function App() {
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

  const coulmnsDef = [
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
      cellFormatter: ageFormatter,
    }
  ];

  const tableData = [
    {
      name: 'Priya',
      age: 30,
      email: 'Priya@email.com'
    },
    {
      name: 'Sam',
      age: 55,
      email: 'sam@email.com'
    },
    {
      name: 'AAnirban',
      age: 30,
      email: 'Anirban@email.com'
    },
    {
      name: 'AByan',
      age: 55,
      email: 'Ayan@email.com'
    },
    {
      name: 'ACnimesh',
      age: 30,
      email: 'Animesh@email.com'
    },
    {
      name: 'ADnanya',
      age: 55,
      email: 'Ananya@email.com'
    },
  ]

  return (
    <div className="App">
      <Table data={tableData} columns={coulmnsDef} />
    </div>
  );
}

export default App;
