


function Navbar({ setShowArchived, addModalRef }) {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl" onClick={() => setShowArchived(false)}>Active Notes</a>
        <a className="btn btn-ghost text-xl" onClick={() => setShowArchived(true)}>Archived Notes</a>
      </div>
      <div className="navbar-end">
        <button className="btn" onClick={() => addModalRef.current.showModal()}>Add Note +</button>
      </div>
    </div>
  );
}

export default Navbar;
