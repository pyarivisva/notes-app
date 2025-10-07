import React from "react";
import NoteList from "../components/NoteList";
import { getAllNotes, deleteNote, unarchiveNote } from "../utils/local-data";

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getAllNotes().filter((n) => n.archived),
    };
    this.onDelete = this.onDelete.bind(this);
    this.onUnarchive = this.onUnarchive.bind(this);
  }

  onDelete(id) {
    deleteNote(id);
    this.setState({
      notes: getAllNotes().filter((n) => n.archived),
    });
  }

  onUnarchive(id) {
    unarchiveNote(id);
    this.setState({
      notes: getAllNotes().filter((n) => n.archived),
    });
  }

  render() {
    return (
      <main>
        <h2>Arsip Catatan</h2>
        <NoteList
          notes={this.state.notes}
          onDelete={this.onDelete}
          onArchive={this.onUnarchive}
          emptyMessage="Arsip kosong"
        />
      </main>
    );
  }
}

export default ArchivePage;
