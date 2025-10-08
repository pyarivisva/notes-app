import React, { useState, useContext } from "react";
import { FiSave } from "react-icons/fi";
import LocaleContext from "../contexts/LocaleContext";

function NoteInput({ addNote }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { locale } = useContext(LocaleContext);

  const onTitleChangeHandler = (event) => {
    if (event.target.value.length <= 50) {
      setTitle(event.target.value);
    }
  };

  const onBodyChangeHandler = (event) => {
    setBody(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;

    addNote({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form className="add-new-page__input" onSubmit={onSubmitHandler}>
      <input
        type="text"
        className="add-new-page__input__title"
        placeholder={locale === "id" ? "Judul Catatan" : "Note Title"}
        value={title}
        onChange={onTitleChangeHandler}
      />
      <textarea
        className="add-new-page__input__body"
        placeholder={
          locale === "id"
            ? "Tulis catatan di sini..."
            : "Write your note here..."
        }
        value={body}
        onChange={onBodyChangeHandler}
      />
      <button
        type="submit"
        className="add-new-page__action"
        title="Simpan Catatan"
      >
        <FiSave />
        {locale === "id" ? "Simpan" : "Save"}
      </button>
    </form>
  );
}

export default NoteInput;
