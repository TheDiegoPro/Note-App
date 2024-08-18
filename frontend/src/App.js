// App.js
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import NoteList from './components/NoteList';
import NoteModal from './components/NoteModal';

function App() {
  // State variables
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTag, setNoteTag] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');
  const [editNoteTag, setEditNoteTag] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [tagFilter, setTagFilter] = useState('');

  // Refs for modals
  const editModalRef = useRef(null);
  const addModalRef = useRef(null);

  // Fetch notes when component mounts or when showArchived changes
  useEffect(() => {
    fetchNotes();
  }, [showArchived]);

  // Function to fetch notes from the server
  const fetchNotes = async () => {
    const url = showArchived ? 'http://localhost:3001/notes/archived' : 'http://localhost:3001/notes/active';
    const response = await fetch(url);
    const data = await response.json();
    setNotes(data);
  };

  // Function to add a new note
  const addNote = async () => {
    if (noteTitle.trim() === '' || noteContent.trim() === '' || noteTag.trim() === '') return;

    const response = await fetch('http://localhost:3001/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: noteTitle,
        text: noteContent,
        tag: noteTag,
      }),
    });
    const newNote = await response.json();
    setNotes([...notes, newNote]);

    // Clear form inputs and close the modal
    setNoteTitle('');
    setNoteContent('');
    setNoteTag('');
    if (addModalRef.current) {
      addModalRef.current.close();
    }
  };

  // Function to edit an existing note
  const editNote = async (id, updatedData) => {
    const response = await fetch(`http://localhost:3001/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const updatedNote = await response.json();
    setNotes(notes.map(note => (note.id === id ? updatedNote : note)));
  };

  // Function to delete a note
  const deleteNote = async (id) => {
    await fetch(`http://localhost:3001/notes/${id}`, {
      method: 'DELETE',
    });
    setNotes(notes.filter(note => note.id !== id));
  };

  // Function to archive a note
  const archiveNote = async (id) => {
    const response = await fetch(`http://localhost:3001/notes/${id}/archive`, {
      method: 'PUT',
    });
    const archivedNote = await response.json();

    // Force update of the notes array to reflect the change
    setNotes(notes.map(note => (note.id === id ? archivedNote : note)));

    // Reload notes after archiving
    fetchNotes();
  };

  // Function to unarchive a note
  const unarchiveNote = async (id) => {
    const response = await fetch(`http://localhost:3001/notes/${id}/unarchive`, {
      method: 'PUT',
    });
    const unarchivedNote = await response.json();

    // Force update of the notes array to reflect the change
    setNotes(notes.map(note => (note.id === id ? unarchivedNote : note)));

    // Reload notes after unarchiving
    fetchNotes();
  };

  // Function to handle edit button click and open the edit modal
  const handleEditClick = (note) => {
    setEditNoteId(note.id);
    setEditNoteTitle(note.title);
    setEditNoteContent(note.text);
    setEditNoteTag(note.tag);

    // Open the edit modal
    setTimeout(() => {
      if (editModalRef.current) {
        editModalRef.current.showModal();
      } else {
        console.error(`Modal with ID edit-modal-${note.id} not found.`);
      }
    }, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar setShowArchived={setShowArchived} addModalRef={addModalRef} />
      <NoteList
        notes={notes}
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
        handleEditClick={handleEditClick}
        deleteNote={deleteNote}
        archiveNote={archiveNote}
        unarchiveNote={unarchiveNote}
      />
      <NoteModal
        modalRef={addModalRef}
        title={noteTitle}
        content={noteContent}
        tag={noteTag}
        setTitle={setNoteTitle}
        setContent={setNoteContent}
        setTag={setNoteTag}
        onSave={addNote}
        isEditMode={false}
      />
      {editNoteId !== null && (
        <NoteModal
          modalRef={editModalRef}
          title={editNoteTitle}
          content={editNoteContent}
          tag={editNoteTag}
          setTitle={setEditNoteTitle}
          setContent={setEditNoteContent}
          setTag={setEditNoteTag}
          onSave={() => {
            editNote(editNoteId, { title: editNoteTitle, text: editNoteContent, tag: editNoteTag });
            editModalRef.current.close();
          }}
          isEditMode={true}
        />
      )}
    </div>
  );
}

export default App;
