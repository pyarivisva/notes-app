import React from "react";
import { useNavigate } from "react-router-dom";
import NoteInput from "../components/NoteInput";
import { addNote } from "../utils/local-data";

function AddPage() {
  const navigate = useNavigate();

  function onAddNote({ title, body }) {
    addNote({ title, body });
    navigate("/");
  }

  return (
    <main>
      <h2>Tambah Catatan</h2>
      <NoteInput addNote={onAddNote} />
    </main>
  );
}

export default AddPage;
