import NoteCard from './NoteCard';

function NoteList({ notes, tagFilter, setTagFilter, handleEditClick, deleteNote, archiveNote, unarchiveNote }) {
  const filteredNotes = notes.filter(note =>
    note.tag.toLowerCase().includes(tagFilter.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Notes</h2>
      <input
        type="text"
        placeholder="Filter by tag..."
        className="input input-bordered w-full max-w-xs mb-4"
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={handleEditClick}
            onDelete={deleteNote}
            onArchiveToggle={note.archived ? unarchiveNote : archiveNote}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteList;
