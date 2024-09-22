// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define a schema and model for the data
const dataSchema = new mongoose.Schema({
  Name: String,
  Age: Number,
  Fruits: [String],
});

const Data = mongoose.model('Data', dataSchema);

// API routes
app.get('/api/data', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

app.post('/api/data', async (req, res) => {
  const newData = new Data(req.body);
  await newData.save();
  res.json(newData);
});

app.delete('/api/data/:id', async (req, res) => {
  await Data.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
