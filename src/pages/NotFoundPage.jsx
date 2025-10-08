import React from "react";
import LocaleContext from "../contexts/LocaleContext";

function NotFoundPage() {
  const { locale } = React.useContext(LocaleContext);

  return (
    <main>
      <h2>
        {locale === "id" ? "404 — Halaman Tidak Ditemukan" : "404 — Not Found"}
      </h2>
      <p>
        {locale === "id"
          ? "Maaf, halaman yang Anda cari tidak ada."
          : "Sorry, the page you are looking for does not exist."}
      </p>
    </main>
  );
}

export default NotFoundPage;
