import React from "react";
import { useNavigate } from "react-router-dom";
import NoteInput from "../components/NoteInput";
import { addNote } from "../utils/network-data";
import LocaleContext from "../contexts/LocaleContext";

function AddPage() {
  const navigate = useNavigate();
  const { locale } = React.useContext(LocaleContext);

  async function onAddNote({ title, body }) {
    await addNote({ title, body });
    navigate("/");
  }

  return (
    <main>
      <h2>{locale === "id" ? "Tambah Catatan" : "Add Note"}</h2>
      <NoteInput addNote={onAddNote} />
    </main>
  );
}

export default AddPage;
