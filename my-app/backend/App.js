import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./DataTable";
import './App.css';

function App() {
  const [columns, setColumns] = useState([
    { name: "Name", type: "text" },
    { name: "Age", type: "number" },
    { name: "Fruits", type: "text" },
  ]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
    };
    fetchData();
  }, []);

  const addRow = async (newRow) => {
    const response = await axios.post('http://localhost:5000/api/data', newRow);
    setData([...data, response.data]);
  };

  const deleteRow = async (rowIndex) => {
    const id = data[rowIndex]._id;
    await axios.delete(`http://localhost:5000/api/data/${id}`);
    const updatedData = data.filter((_, index) => index !== rowIndex);
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
      />
    </div>
  );
}

export default App;
