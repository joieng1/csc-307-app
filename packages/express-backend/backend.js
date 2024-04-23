// backend.js
import express from "express";
import userServices from "./models/user-services.js";
import cors from "cors";

const app = express();
app.use(cors());
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


app.get("/users", async (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  const result = await userServices.getUsers(name,job);
  res.send(result);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = await userServices.findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  const result = await userServices.addUser(userToAdd);
  if (result) {
  res.status(201).send(result);
  }
  else {
    res.send("Failed to post");
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params["id"];
  let result = deleteUserById(userId);
  if(result) {
    res.status(204).send();
  }
  else {
    res.status(404).send();
  }
});

