import React from "react";
import { useSearchParams } from "react-router-dom";
import NoteSearch from "../components/NoteSearch";
import NoteList from "../components/NoteList";
import {
  getAllNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/local-data";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  function changeSearchParams(k) {
    if (!k) setSearchParams({});
    else setSearchParams({ keyword: k });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getAllNotes(),
      keyword: props.defaultKeyword || "",
    };
  }

  componentDidMount() {
    this.refreshNotes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultKeyword !== this.props.defaultKeyword) {
      this.setState(
        { keyword: this.props.defaultKeyword || "" },
        this.refreshNotes
      );
    }
  }

  refreshNotes = () => {
    this.setState({ notes: getAllNotes() });
  };

  onDeleteHandler = (id) => {
    deleteNote(id);
    this.refreshNotes();
  };

  onArchiveHandler = (id) => {
    const note = this.state.notes.find((n) => n.id === id);
    if (note && note.archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    this.refreshNotes();
  };

  onSearchChangeHandler = (keyword) => {
    this.setState({ keyword });
    this.props.keywordChange(keyword);
  };

  render() {
    const { notes, keyword } = this.state;
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );
    const activeNotes = filtered.filter((note) => !note.archived);

    return (
      <main>
        <NoteSearch keyword={keyword} onSearch={this.onSearchChangeHandler} />

        <h2>Catatan Aktif</h2>
        <NoteList
          notes={activeNotes}
          onDelete={this.onDeleteHandler}
          onArchive={this.onArchiveHandler}
          emptyMessage="Tidak ada catatan"
        />
      </main>
    );
  }
}

export default HomePageWrapper;
