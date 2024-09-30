## Dynamic Table Management with React and MongoDB

This project is a **Dynamic Table Management** app built using **React.js** with a **Node.js** backend and **MongoDB** for data storage. It allows users to dynamically add, update, delete, filter, and sort data, and save it to a database. The table supports two column types: "text" and "number". Rows can be added, deleted, and filtered dynamically with modals enhancing the user experience.

### Features
- **Dynamic Table Creation**: 
  - Add/Remove columns with text or number data types.
  - Add/Delete rows with editable cell data.
  - Support for complex cell values (e.g., arrays like `["Apple", "Orange"]`).
  
- **Data Storage**:
  - Save and retrieve table data using a **MongoDB** database.
  - Automatic data persistence across sessions.

- **Data Filtering**: 
  - Filter rows based on column data.
  - Separate filter types for text (e.g., contains, does not contain) and number (e.g., greater than, less than) columns.

- **Sorting Functionality**: 
  - Sort columns based on text or number data.
  
- **Modals for Interaction**: 
  - Add, delete, and edit rows and columns using modals for an intuitive user experience.
  
- **Logging for Debugging**:
  - Console logging on every add/delete action to track user interactions.

- **Responsive UI**: 
  - Eye-pleasing, responsive interface with HCI design principles for easy navigation and usage.

### Tech Stack
- **Frontend**: React.js, HTML/CSS, JavaScript
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB (with Mongoose ODM)
- **Other Libraries**: Axios (for API requests), React Modal, React Table

### Getting Started

Follow these steps to set up the project on your local machine:

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (either locally or using MongoDB Atlas)

#### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/Surajwalia1/dynamic-table-management.git
```

2. **Navigate to the project folder**:

```bash
cd dynamic-table-management
```

3. **Install dependencies for both frontend and backend**:

```bash
# In the project root (for React)
npm install
# or
yarn install

# Navigate to the backend folder and install dependencies
cd backend
npm install
# or
yarn install
```

4. **Start the backend server**:

Ensure MongoDB is running locally or set up MongoDB Atlas and update the connection string in `server.js`.

```bash
# From the backend folder
node server.js
```

5. **Start the React development server**:

```bash
# From the project root
npm start
# or
yarn start
```

Your React app should now be running on [localhost:3000](http://localhost:3000), and the backend server on [localhost:5000](http://localhost:5000).

### Project Structure
```plaintext
backend/
├── models/
│   └── Data.js                # Mongoose schema for table data
├── server.js                  # Express server with API endpoints
src/
├── components/
│   ├── DataTable.js           # Main table component
│   ├── AddRowModal.js         # Modal to add new row
│   └── DeleteRowModal.js      # Modal to delete row
├── App.js                     # Root component
├── App.css                    # Styles for the app
└── index.js                   # Entry point
```

### API Endpoints

- **GET /api/data**: Retrieve all rows from the MongoDB database.
- **POST /api/data**: Add a new row to the database.
- **DELETE /api/data/:id**: Delete a specific row from the database.

### How to Use

1. **Add Row**: Click the `+ Add Row` button to open a modal where you can input details like `Name`, `Age`, and `Fruits`. After submitting, the new row will be added to the table and stored in the MongoDB database.
2. **Delete Row**: Click the delete icon in the row you want to remove. A confirmation modal will appear, and you can confirm to delete. The data will also be removed from MongoDB.
3. **Add Column**: Click the `+ Add New Column` button to add a column with a custom name and data type (text/number).
4. **Filter and Sort**: Click the filter icons next to each column name to filter data based on content or values.
5. **Console Logging**: Actions like adding/deleting rows and columns trigger console logs for easier debugging.

### CSS Styles
The app uses **Human-Computer Interaction (HCI)** principles to ensure a user-friendly interface. The colors, hover effects, and modals are designed to enhance the user experience and readability.

### Database Connection
Ensure you have a MongoDB instance running (either locally or through MongoDB Atlas). Update the MongoDB connection string in the `server.js` file as needed:

```javascript
mongoose.connect('mongodb://localhost:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
```

### Contributing
Feel free to fork this repository and submit pull requests with improvements or bug fixes. Contributions are always welcome!

### License
This project is licensed under the MIT License.
