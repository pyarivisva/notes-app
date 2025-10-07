import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/local-data";
import { showFormattedDate } from "../utils";
import DeleteButton from "../components/DeleteButton";
import ArchiveButton from "../components/ArchiveButton";

function NoteDetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <NoteDetailPage id={id} navigate={navigate} />;
}

class NoteDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: getNote(props.id),
    };

    this.onDelete = this.onDelete.bind(this);
    this.onToggleArchive = this.onToggleArchive.bind(this);
  }

  onDelete() {
    deleteNote(this.props.id);
    this.props.navigate("/"); // atau ke /notes
  }

  onToggleArchive() {
    const note = this.state.note;
    if (!note) return;
    if (note.archived) {
      unarchiveNote(this.props.id);
    } else {
      archiveNote(this.props.id);
    }
    this.setState({ note: getNote(this.props.id) });
  }

  render() {
    const { note } = this.state;
    if (!note) {
      return <p>Catatan tidak ditemukan</p>;
    }

    return (
      <section className="detail-page">
        <h1 className="detail-page__title">{note.title}</h1>
        <p className="detail-page__createdAt">
          {showFormattedDate(note.createdAt)}
        </p>
        <p className="detail-page__body">{note.body}</p>

        <div className="detail-page__action">
          <DeleteButton onClick={this.onDelete} />
          <ArchiveButton
            onClick={this.onToggleArchive}
            isArchived={note.archived}
          />
        </div>
      </section>
    );
  }
}

export default NoteDetailPageWrapper;
