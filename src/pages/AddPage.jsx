import React from "react";
import { useNavigate } from "react-router-dom";
import NoteInput from "../components/NoteInput";
import { addNote } from "../utils/local-data";

function AddPageWrapper() {
  const navigate = useNavigate();
  return <AddPage navigate={navigate} />;
}

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.onAddNote = this.onAddNote.bind(this);
  }

  onAddNote({ title, body }) {
    addNote({ title, body });
    this.props.navigate("/");
  }

  render() {
    return (
      <main>
        <h2>Tambah Catatan</h2>
        <NoteInput addNote={this.onAddNote} />
      </main>
    );
  }
}

export default AddPageWrapper;
