import React from "react";
import { useNavigate } from "react-router-dom";
import NoteInput from "../components/NoteInput";
import { addNote } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";
import useLoading from "../hooks/useLoading";

function AddPage() {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);
  const { loading, withLoading } = useLoading();

  async function onAddNote({ title, body }) {
    withLoading(async () => {
      await addNote({ title, body });

      alert(
        locale === "id"
          ? "Catatan berhasil ditambahkan!"
          : "Note added successfully!"
      );

      navigate("/");
    });
  }

  return (
    <main>
      <h2>{locale === "id" ? "Tambah Catatan" : "Add Note"}</h2>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <span>{locale === "id" ? "Menyimpan..." : "Saving..."}</span>
          </div>
        </div>
      )}

      <NoteInput addNote={onAddNote} />
    </main>
  );
}

export default AddPage;
