import React from "react";
import NoteList from "../components/NoteList";
import { useSearchParams } from "react-router-dom";
import NoteSearch from "../components/NoteSearch";
import {
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
} from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });
  const [notes, setNotes] = React.useState([]);
  const { locale } = React.useContext(LocaleContext);

  // Ambil data catatan terarsip dari API
  React.useEffect(() => {
    async function fetchArchivedNotes() {
      const { data } = await getArchivedNotes();
      setNotes(data);
    }
    fetchArchivedNotes();
  }, []);

  // Handler hapus catatan
  async function onDeleteHandler(id) {
    await deleteNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  // Handler batal arsip
  async function onUnarchiveHandler(id) {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  // Handler pencarian
  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  // Filter catatan berdasarkan keyword
  const filteredNotes = notes.filter(
    (note) =>
      note.archived && // hanya yang terarsip
      note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <main>
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
