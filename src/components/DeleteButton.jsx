import React from "react";
import { FiTrash2 } from "react-icons/fi";

function DeleteButton({ onClick }) {
  return (
    <button className="action" onClick={onClick} title="Hapus Catatan">
      <FiTrash2 />
    </button>
  );
}

export default DeleteButton;
