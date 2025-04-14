import React from "react";

const NotFound = () => {
  return (
    <div className="container my-5 text-center">
      <h1 className="text-danger">404</h1>
      <h2 className="text-danger">Pagina non trovata</h2>
      <p>La pagina che stai cercando non esiste.</p>
      <p>Controlla l'URL o torna alla homepage.</p>
    </div>
  );
};

export default NotFound;
