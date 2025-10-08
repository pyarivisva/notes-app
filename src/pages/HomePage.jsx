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

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  // Ambil data catatan aktif dari API
  React.useEffect(() => {
    async function fetchNotes() {
      const { data } = await getActiveNotes();
      setNotes(data);
    }
    fetchNotes();
  }, []);

  // Handler hapus catatan
  async function onDeleteHandler(id) {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  }

  // Handler arsip / batal arsip
  async function onArchiveHandler(id) {
    const note = notes.find((n) => n.id === id);
    if (note && note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }

    const { data } = await getActiveNotes();
    setNotes(data);
  }

  // Handler pencarian
  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  // Filter catatan berdasarkan keyword
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const activeNotes = filteredNotes.filter((note) => !note.archived);

  return (
    <main>
      <NoteSearch keyword={keyword} onSearch={onKeywordChangeHandler} />
      <h2>Catatan Aktif</h2>
      <NoteList
        notes={activeNotes}
        onDelete={onDeleteHandler}
        onArchive={onArchiveHandler}
        emptyMessage="Tidak ada catatan"
      />
    </main>
  );
}

export default HomePage;
