import React from "react";
import { Link } from "react-router-dom";
import NoteItemBody from "./NoteItemBody";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";
import { showFormattedDate } from "../utils";

function NoteItem({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onArchive,
}) {
  return (
    <div className="note-item">
      <Link
        to={`/notes/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <NoteItemBody
          title={title}
          body={body}
          date={showFormattedDate(createdAt)}
        />
      </Link>
      <div className="note-item__action">
        <DeleteButton onClick={() => onDelete(id)} />
        <ArchiveButton onClick={() => onArchive(id)} isArchived={archived} />
      </div>
    </div>
  );
}

export default NoteItem;
