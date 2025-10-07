import React from "react";
import { FiSave } from "react-icons/fi";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    if (event.target.value.length <= 50) {
      this.setState({ title: event.target.value });
    }
  }

  onBodyChangeHandler(event) {
    this.setState({ body: event.target.value });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    if (!this.state.title.trim() || !this.state.body.trim()) return;

    this.props.addNote({
      title: this.state.title,
      body: this.state.body,
    });

    this.setState({ title: "", body: "" });
  }

  render() {
    return (
      <form className="add-new-page__input" onSubmit={this.onSubmitHandler}>
        <input
          type="text"
          className="add-new-page__input__title"
          placeholder="Judul Catatan"
          value={this.state.title}
          onChange={this.onTitleChangeHandler}
        />
        <textarea
          className="add-new-page__input__body"
          placeholder="Tulis catatan di sini..."
          value={this.state.body}
          onChange={this.onBodyChangeHandler}
        />
        <button type="submit" className="action" title="Simpan Catatan">
          <FiSave />
        </button>
      </form>
    );
  }
}

export default NoteInput;
