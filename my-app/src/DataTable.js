import React, { useState, useEffect, useRef } from "react";
import './DataTable.css';
import Modal from "react-modal";

Modal.setAppElement("#root");

const DataTable = ({ columns, data, addRow, deleteRow, addColumn, deleteColumn }) => {
  const [isAddRowModalOpen, setAddRowModalOpen] = useState(false);
  const [isAddColumnModalOpen, setAddColumnModalOpen] = useState(false);
  const [isDeleteRowModalOpen, setDeleteRowModalOpen] = useState(false);
  const [isDeleteColumnModalOpen, setDeleteColumnModalOpen] = useState(false);
  const [newRow, setNewRow] = useState({});
  const [newColumn, setNewColumn] = useState({ name: "", type: "text" });
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState("");
  
  // State for filtering
  const [filters, setFilters] = useState({});
  const [filterMenuOpen, setFilterMenuOpen] = useState(null);
  
  const filterMenuRef = useRef(null);

  const handleAddRow = () => {
    addRow(newRow);
    console.log("Added Row:", newRow);
    setNewRow({});
    setAddRowModalOpen(false);
  };

  const handleAddColumn = () => {
    addColumn(newColumn);
    console.log("Added Column:", newColumn);
    setNewColumn({ name: "", type: "text" });
    setAddColumnModalOpen(false);
  };

  const handleDeleteRow = () => {
    deleteRow(selectedRow);
    console.log("Deleted Row Index:", selectedRow);
    setDeleteRowModalOpen(false);
  };

  const handleDeleteColumn = () => {
    deleteColumn(selectedColumn);
    console.log("Deleted Column:", selectedColumn);
    setDeleteColumnModalOpen(false);
  };

  const handleFilterChange = (columnName, value) => {
    setFilters({ ...filters, [columnName]: value });
  };

  const filteredData = data.filter(row => {
    return Object.keys(filters).every(columnName => {
      const filterValue = filters[columnName];
      if (!filterValue) return true;

      if (typeof row[columnName] === 'number') {
        const numberFilter = filterValue.split(" ");
        const filterOperation = numberFilter[0];
        const filterThreshold = parseFloat(numberFilter[1]);

        if (filterOperation === "Greater") return row[columnName] > filterThreshold;
        if (filterOperation === "Less") return row[columnName] < filterThreshold;
      } else {
        return row[columnName].toString().toLowerCase().includes(filterValue.toLowerCase());
      }
    });
  });

  const resetFilters = () => {
    setFilters({});
  };

  const handleOutsideClick = (e) => {
    if (filterMenuRef.current && !filterMenuRef.current.contains(e.target)) {
      setFilterMenuOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>
                {col.name}
                <button onClick={() => { setSelectedColumn(col.name); setDeleteColumnModalOpen(true); }}>🗑️</button>
                <button onClick={() => {
                  setFilterMenuOpen(filterMenuOpen === col.name ? null : col.name);
                  setFilters({ ...filters, [col.name]: '' });
                }}>🔍</button>
                {filterMenuOpen === col.name && (
                  <div ref={filterMenuRef} className="filter-menu">
                    {col.type === "text" ? (
                      <>
                        <input
                          type="text"
                          value={filters[col.name] || ""}
                          onChange={(e) => handleFilterChange(col.name, e.target.value)}
                          placeholder={`Filter ${col.name}`}
                        />
                        <button onClick={() => handleFilterChange(col.name, '')}>Apply</button>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={filters[col.name] || ""}
                          onChange={(e) => handleFilterChange(col.name, `Greater ${e.target.value}`)}
                          placeholder={`Greater Than`}
                        />
                        <input
                          type="text"
                          value={filters[col.name] || ""}
                          onChange={(e) => handleFilterChange(col.name, `Less ${e.target.value}`)}
                          placeholder={`Less Than`}
                        />
                        <button onClick={() => handleFilterChange(col.name, '')}>Apply</button>
                      </>
                    )}
                  </div>
                )}
              </th>
            ))}
            <th>
              <button onClick={() => setAddColumnModalOpen(true)}>+ Add Column</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {Array.isArray(row[col.name]) ? row[col.name].join(", ") : row[col.name]}
                </td>
              ))}
              <td>
                <button onClick={() => { setSelectedRow(rowIndex); setDeleteRowModalOpen(true); }}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-row-btn" onClick={() => setAddRowModalOpen(true)}>+ Add Row</button>
      <button className="reset-filters-btn" onClick={resetFilters}>Reset All Filters</button>

     {/* Add Row Modal */}
<Modal isOpen={isAddRowModalOpen} onRequestClose={() => setAddRowModalOpen(false)} style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)', padding: '20px' } }}>
  <h2>Add New Row</h2>
  {columns.map((col, index) => (
    <div key={index}>
      <label>{col.name}: </label>
      <input
        type={col.type === "number" ? "number" : "text"}
        value={newRow[col.name] || ""}
        onChange={(e) => setNewRow({ ...newRow, [col.name]: e.target.value })}
      />
    </div>
  ))}
  <button onClick={handleAddRow}>Add Row</button>
  <button onClick={() => setAddRowModalOpen(false)}>Cancel</button>
</Modal>

      
{/* Add Column Modal */}
<Modal isOpen={isAddColumnModalOpen} onRequestClose={() => setAddColumnModalOpen(false)} style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)', padding: '20px' } }}>
  <h2>Add New Column</h2>
  <label>Column Name:</label>
  <input
    type="text"
    value={newColumn.name}
    onChange={(e) => setNewColumn({ ...newColumn, name: e.target.value })}
  />
  <label>Column Type:</label>
  <select value={newColumn.type} onChange={(e) => setNewColumn({ ...newColumn, type: e.target.value })}>
    <option value="text">Text</option>
    <option value="number">Number</option>
  </select>
  <button onClick={handleAddColumn}>Add Column</button>
  <button onClick={() => setAddColumnModalOpen(false)}>Cancel</button>
</Modal>

      {/* Delete Row Modal */}
<Modal 
  isOpen={isDeleteRowModalOpen} 
  onRequestClose={() => setDeleteRowModalOpen(false)} 
  style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)', padding: '20px' } }}
>
  <h2>Are you sure you want to delete this row?</h2>
  <p>This action cannot be undone.</p>
  <button onClick={handleDeleteRow}>Yes, delete</button>
  <button onClick={() => setDeleteRowModalOpen(false)}>Cancel</button>
</Modal>

{/* Delete Column Modal */}
<Modal 
  isOpen={isDeleteColumnModalOpen} 
  onRequestClose={() => setDeleteColumnModalOpen(false)} 
  style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', transform: 'translate(-50%, -50%)', padding: '20px' } }}
>
  <h2>Are you sure you want to delete the {selectedColumn} column?</h2>
  <p>This action cannot be undone.</p>
  <button onClick={handleDeleteColumn}>Yes, delete</button>
  <button onClick={() => setDeleteColumnModalOpen(false)}>Cancel</button>
</Modal>
    </div>
    
  );
};

export default DataTable;
