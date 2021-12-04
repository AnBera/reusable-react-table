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
    },
    {
      header: 'Email',
      accessor: 'email',
      width: 80,
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
      name: 'Anirban',
      age: 30,
      email: 'john@email.com'
    },
    {
      name: 'Ayan',
      age: 55,
      email: 'sam@email.com'
    },
    {
      name: 'Animesh',
      age: 30,
      email: 'john@email.com'
    },
    {
      name: 'Ananya',
      age: 55,
      email: 'sam@email.com'
    },
    {
      name: 'Priya',
      age: 30,
      email: 'john@email.com'
    },
    {
      name: 'Sam',
      age: 55,
      email: 'sam@email.com'
    },
  ]

  return (
    <div className="App">
      <Table data={tableData} columns={coulmnsDef} />
    </div>
  );
}

export default App;
