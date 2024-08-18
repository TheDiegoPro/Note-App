import React, { useState } from 'react';

function NoteCard({ note, onEdit, onDelete, onArchiveToggle }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEditClick = () => {
    onEdit(note); // Calls onEdit with the note being edited
  };

  const handleDeleteClick = () => {
    setShowConfirmModal(true); // Show the confirmation modal
  };

  const handleConfirmDelete = () => {
    onDelete(note.id); // Call the delete function with note ID
    setShowConfirmModal(false); // Close the confirmation modal
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false); // Close the modal without deleting
  };

  return (
    <div className="card bg-primary text-white w-96 mb-4 relative">
      <button
        className="btn btn-sm btn-circle absolute top-2 right-2"
        onClick={handleDeleteClick}
      >
        ✕
      </button>
      <div className="card-body">
        <h2 className="card-title">{note.title}</h2>
        {note.tag && <span className="badge badge-secondary">{note.tag}</span>}
        <p className="py-2">{note.text}</p>

        <div className="card-actions justify-end">
          <button className="btn" onClick={handleEditClick}>Edit</button>
          <button
            className={`btn ${note.archived ? 'btn-green' : 'btn-gray'}`}
            onClick={() => onArchiveToggle(note.id)}
          >
            {note.archived ? 'Unarchive' : 'Archive'}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <dialog className="modal modal-bottom sm:modal-middle text-white" open>
          <div className="modal-box  text-white">
            <h3 className="font-bold text-lg">Confirmation</h3>
            <p className="py-4">Are you sure you want to delete this note?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleConfirmDelete}>Delete</button>
              <button className="btn" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default NoteCard;
