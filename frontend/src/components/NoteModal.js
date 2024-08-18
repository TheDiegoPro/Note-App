
function NoteModal({ modalRef, title, content, tag, setTitle, setContent, setTag, onSave, isEditMode }) {
  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{isEditMode ? 'Edit Note' : 'Add New Note'}</h3>
        <p className="py-4">Note Title</p>
        <input
          type="text"
          placeholder="Note Title"
          className="input input-bordered w-full max-w-xs"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="py-4">Note Content</p>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <p className="py-4">Tag</p>
        <input
          type="text"
          placeholder="Tag Name..."
          className="input input-bordered w-full max-w-xs"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <div className="modal-action">
          <button className="btn btn-accent" onClick={onSave}>{isEditMode ? 'Save' : 'Add Note'}</button>
          <button className="btn btn-error" onClick={() => modalRef.current.close()}>Close</button>
        </div>
      </div>
    </dialog>
  );
}

export default NoteModal;
