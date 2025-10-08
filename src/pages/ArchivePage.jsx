import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteList from "../components/NoteList";
import NoteSearch from "../components/NoteSearch";
import {
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
} from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import useLoading from "../hooks/useLoading";

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(
    () => searchParams.get("keyword") || ""
  );
  const [notes, setNotes] = React.useState([]);
  const { locale } = React.useContext(LocaleContext);
  const { loading, withLoading } = useLoading();

  React.useEffect(() => {
    withLoading(async () => {
      const { data } = await getArchivedNotes();
      setNotes(data);
    });
  }, []);

  const onDeleteHandler = (id) => {
    withLoading(async () => {
      await deleteNote(id);
      alert(
        locale === "id"
          ? "Catatan berhasil dihapus!"
          : "Note deleted successfully!"
      );

      const { data } = await getArchivedNotes();
      setNotes(data);
    });
  };

  const onUnarchiveHandler = (id) => {
    withLoading(async () => {
      await unarchiveNote(id);
      const { data } = await getArchivedNotes();
      setNotes(data);
    });
  };

  const onKeywordChangeHandler = (keyword) => {
    setKeyword(keyword);
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.archived && note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <main>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <span>{locale === "id" ? "Memuat..." : "Loading..."}</span>
          </div>
        </div>
      )}

      <NoteSearch keyword={keyword} onSearch={onKeywordChangeHandler} />

      <h2>{locale === "id" ? "Arsip Catatan" : "Archived Notes"}</h2>

      <NoteList
        notes={filteredNotes}
        onDelete={onDeleteHandler}
        onArchive={onUnarchiveHandler}
        emptyMessage={locale === "id" ? "Arsip kosong" : "No archives"}
      />
    </main>
  );
}

export default ArchivePage;
