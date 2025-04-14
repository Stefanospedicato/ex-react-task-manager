import React from "react";

const Homepage = () => {
  return (
    <div className="container my-5 new-task p-5 mb-5 text-white">
      <h1 className="text-center mt-3 mb-5">
        Benvenuto nella tua App per la gestione dei Task!
      </h1>
      <div className="container my-5">
        <p className="text-center">
          In questa applicazione puoi creare, modificare e gestire i tuoi task
          in modo semplice e veloce.
        </p>
        <p className="text-center">
          Inizia a organizzare le tue attività e a rimanere produttivo!
        </p>
      </div>
    </div>
  );
};

export default Homepage;
