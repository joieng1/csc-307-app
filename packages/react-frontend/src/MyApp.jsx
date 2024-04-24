// src/MyApp.jsx
import { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function fetchUsers() {
    const promise = await fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then(async (res) => {
        if (res.status === 201) {
          // update state if response returns 201
          const data = await res.json();
          setCharacters(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function removeOneCharacter(index) {
    const userId = characters[index]._id;
    await fetch(`http://localhost:8000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status == 204) {
          const updatedCharacters = characters.filter((_, i) => i !== index);
          setCharacters(updatedCharacters);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
