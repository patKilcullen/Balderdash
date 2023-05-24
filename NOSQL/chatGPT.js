// server.js
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

// Create a MongoClient
const client = new MongoClient(url);

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  // Select the database
  const db = client.db(dbName);

  // Define an API endpoint to create a round document
  app.post('/api/rounds', (req, res) => {
    const { gameName, word, definitions } = req.body;

    // Specify the collection name
    const collectionName = 'rounds';

    // Insert a document into the collection
    db.collection(collectionName).insertOne(
      { gameName, word, definitions },
      (err) => {
        if (err) {
          console.error('Error creating round:', err);
          res.status(500).json({ error: 'Error creating round' });
        } else {
          res.status(201).json({ message: 'Round created successfully' });
        }
      }
    );
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});