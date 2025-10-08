import React from "react";
import LocaleContext from "../contexts/LocaleContext";

function NoteSearch({ keyword, onSearch }) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={locale === "id" ? "Cari catatan..." : "Search notes..."}
        value={keyword}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}

export default NoteSearch;
