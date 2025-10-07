import React from "react";

function NoteSearch({ keyword, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cari catatan..."
        value={keyword}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}

export default NoteSearch;
