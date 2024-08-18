const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Path to the SQLite file
});

// Define the Note model
const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false, // Title is required
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false, // Text is required
  },
  tag: { // Tag field added to store note tags
    type: DataTypes.STRING,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Notes are not archived by default
  },
});

// Sync the model with the database
sequelize.sync().then(() => {
  console.log('Database synced successfully');
});

// Update a note by ID
app.put('/notes/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    await note.update(req.body); // Update the note with the new data
    res.json(note); // Return the updated note
  } else {
    res.status(404).json({ error: 'Note not found' }); // Error if note is not found
  }
});

// Delete a note by ID
app.delete('/notes/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    await note.destroy(); // Delete the note from the database
    res.json({ message: 'Note deleted successfully' }); // Confirm deletion
  } else {
    res.status(404).json({ error: 'Note not found' }); // Error if note is not found
  }
});

// Create a new note
app.post('/notes', async (req, res) => {
  const { title, text, tag } = req.body;
  try {
    const newNote = await Note.create({ title, text, tag }); // Create a new note
    res.json(newNote); // Return the created note
  } catch (error) {
    res.status(500).json({ error: 'Error creating note' }); // Handle any errors
  }
});

// Get all notes
app.get('/notes', async (req, res) => {
  const notes = await Note.findAll(); // Retrieve all notes
  res.json(notes); // Return the notes
});

// Archive a note by ID
app.put('/notes/:id/archive', async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    note.archived = true; // Mark the note as archived
    await note.save(); // Save the updated note
    res.json(note); // Return the updated note
  } else {
    res.status(404).json({ error: 'Note not found' }); // Error if note is not found
  }
});

// Unarchive a note by ID
app.put('/notes/:id/unarchive', async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    note.archived = false; // Mark the note as unarchived
    await note.save(); // Save the updated note
    res.json(note); // Return the updated note
  } else {
    res.status(404).json({ error: 'Note not found' }); // Error if note is not found
  }
});

// Get all active notes (not archived)
app.get('/notes/active', async (req, res) => {
  const notes = await Note.findAll({ where: { archived: false } }); // Retrieve active notes
  res.json(notes); // Return the active notes
});

// Get all archived notes
app.get('/notes/archived', async (req, res) => {
  const notes = await Note.findAll({ where: { archived: true } }); // Retrieve archived notes
  res.json(notes); // Return the archived notes
});

// Start the server
app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
