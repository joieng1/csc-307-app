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
  try {
    const result = await userServices.getUsers(name,job);
      res.send(result);
  } catch (err) {
    res.send(err);
  }
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
  try {
  const result = await userServices.addUser(userToAdd);
  res.status(201).send(result);
  } catch (err) {
    res.send("Failed to post: ", err);
  }
});


app.delete("/users/:id", async (req, res) => {
  const userId = req.params["id"];
  try {
    const result = await userServices.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    res.status(404).send();
  }
});

