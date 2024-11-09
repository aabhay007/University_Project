import axios from "axios";
import React, { useEffect, useState } from "react";

function Movies() {
  //const [Form, setForm] = useState({ name: "" });
  const [name, setName] = useState("");
  useEffect(() => {
    Movies();
  });
  function Movies() {
    axios.get("https://localhost:7271/api/Movies").then((response) => {
      console.log(response.data[0].name);
      setName(response.data[0].name);
    });
  }

  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
}

export default Movies;
