import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";
import { showFormattedDate } from "../utils";
import DeleteButton from "../components/DeleteButton";
import ArchiveButton from "../components/ArchiveButton";
import LocaleContext from "../contexts/LocaleContext";

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);
  const { locale } = React.useContext(LocaleContext);

  // Ambil detail note berdasarkan id
  React.useEffect(() => {
    async function fetchNote() {
      const { data } = await getNote(id);
      setNote(data);
    }
    fetchNote();
  }, [id]);

  // Hapus catatan
  async function onDelete() {
    await deleteNote(id);
    navigate("/");
  }

  // Arsip atau batalkan arsip
  async function onToggleArchive() {
    if (!note) return;

    if (note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }

    // Ambil ulang data terbaru
    const { data } = await getNote(id);
    setNote(data);
  }

  // Jika data belum dimuat
  if (!note) {
    return <p>{locale === "id" ? "Memuat catatan..." : "Loading note..."}</p>;
  }

  return (
    <section className="detail-page">
      <h1 className="detail-page__title">{note.title}</h1>
      <p className="detail-page__createdAt">
        {showFormattedDate(note.createdAt)}
      </p>
      <p className="detail-page__body">{note.body}</p>

      <div className="detail-page__action">
        <DeleteButton onClick={onDelete} />
        <ArchiveButton onClick={onToggleArchive} isArchived={note.archived} />
      </div>
    </section>
  );
}

export default NoteDetailPage;
