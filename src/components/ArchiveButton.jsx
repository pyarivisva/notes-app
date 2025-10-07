import React from "react";
import { FiArchive, FiInbox } from "react-icons/fi";

function ArchiveButton({ onClick, isArchived }) {
  return (
    <button
      className="action"
      onClick={onClick}
      title={isArchived ? "Pindahkan ke Aktif" : "Arsipkan"}
    >
      {isArchived ? <FiInbox /> : <FiArchive />}
    </button>
  );
}

export default ArchiveButton;
