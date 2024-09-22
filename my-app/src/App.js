import React, { useState } from "react";
import DataTable from "./DataTable";
import './App.css';

function App() {
  const [columns, setColumns] = useState([
    { name: "Name", type: "text" },
    { name: "Age", type: "number" },
    { name: "Fruits", type: "text" },
  ]);
  const [data, setData] = useState([
    { Name: "John", Age: 25, Fruits: ["Apple", "Banana"] },
    { Name: "Doe", Age: 30, Fruits: ["Orange", "Mango"] },
  ]);

  const addRow = (newRow) => {
    setData([...data, newRow]);
  };

  const deleteRow = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setData(updatedData);
  };

  const addColumn = (newColumn) => {
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnName) => {
    const updatedColumns = columns.filter((column) => column.name !== columnName);
    setColumns(updatedColumns);
    const updatedData = data.map(row => {
      const newRow = { ...row };
      delete newRow[columnName];
      return newRow;
    });
    setData(updatedData);
  };

  return (
    <div className="App">
      <h1>Dynamic Table Management</h1>
      <DataTable 
        columns={columns} 
        data={data} 
        addRow={addRow} 
        deleteRow={deleteRow} 
        addColumn={addColumn} 
        deleteColumn={deleteColumn} 
      />
    </div>
  );
}

export default App;
