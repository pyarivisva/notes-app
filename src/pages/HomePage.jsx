import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteSearch from "../components/NoteSearch";
import NoteList from "../components/NoteList";
import {
  getActiveNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import useLoading from "../hooks/useLoading";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = React.useContext(LocaleContext);
  const { loading, withLoading } = useLoading();

  React.useEffect(() => {
    withLoading(async () => {
      const { data } = await getActiveNotes();
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

      const { data } = await getActiveNotes();
      setNotes(data);
    });
  };

  const onArchiveHandler = (id) => {
    withLoading(async () => {
      const note = notes.find((n) => n.id === id);
      if (note && note.archived) {
        await unarchiveNote(id);
      } else {
        await archiveNote(id);
      }
      const { data } = await getActiveNotes();
      setNotes(data);
    });
  };

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const activeNotes = filteredNotes.filter((note) => !note.archived);

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
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
      <NoteList
        notes={activeNotes}
        onDelete={onDeleteHandler}
        onArchive={onArchiveHandler}
        emptyMessage={locale === "id" ? "Tidak ada catatan" : "No notes"}
      />
    </main>
  );
}

export default HomePage;
