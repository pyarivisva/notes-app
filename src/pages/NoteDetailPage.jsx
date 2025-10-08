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
import useLoading from "../hooks/useLoading";

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);
  const { locale } = React.useContext(LocaleContext);
  const { loading, withLoading } = useLoading();

  React.useEffect(() => {
    withLoading(async () => {
      const { data } = await getNote(id);
      setNote(data);
    });
  }, [id]);

  async function onDelete() {
    await withLoading(async () => {
      await deleteNote(id);

      alert(
        locale === "id"
          ? "Catatan berhasil dihapus!"
          : "Note deleted successfully!"
      );

      navigate("/");
    });
  }

  async function onToggleArchive() {
    if (!note) return;

    await withLoading(async () => {
      if (note.archived) {
        await unarchiveNote(id);
      } else {
        await archiveNote(id);
      }

      const { data } = await getNote(id);
      setNote(data);
    });
  }

  return (
    <section className="detail-page">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <span>{locale === "id" ? "Memuat..." : "Loading..."}</span>
          </div>
        </div>
      )}

      {!note && !loading && (
        <p>{locale === "id" ? "Memuat catatan..." : "Loading note..."}</p>
      )}

      {note && (
        <>
          <h1 className="detail-page__title">{note.title}</h1>
          <p className="detail-page__createdAt">
            {showFormattedDate(note.createdAt)}
          </p>
          <p className="detail-page__body">{note.body}</p>

          <div className="detail-page__action">
            <DeleteButton onClick={onDelete} />
            <ArchiveButton
              onClick={onToggleArchive}
              isArchived={note.archived}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default NoteDetailPage;
