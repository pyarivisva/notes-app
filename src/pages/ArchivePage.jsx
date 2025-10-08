import React from "react";
import NoteList from "../components/NoteList";
import {
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
} from "../utils/network-data";

function ArchivePage() {
  const [notes, setNotes] = React.useState([]);

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

  return (
    <main>
      <h2>Arsip Catatan</h2>
      <NoteList
        notes={notes}
        onDelete={onDeleteHandler}
        onArchive={onUnarchiveHandler}
        emptyMessage="Arsip kosong"
      />
    </main>
  );
}

export default ArchivePage;
