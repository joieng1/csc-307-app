// backend.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  console.log("Name" + name + job);
  if (name != undefined) {
    // if name and job is inputted
    if (job != undefined) {
      let result = getAllUsersFilter(name, job);
      result = { users_list: result };
      res.send(result);
      return;
    }
    //filter by name only
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd["id"] = Date.now();
  addUser(userToAdd);
  res.status(201).send(users);
});

const deleteUserById = (id) => {
  users["users_list"] = users["users_list"].filter((user) => user["id"] !== id);
  return users;
};

app.delete("/users/:id", (req, res) => {
  console.log("CANNASD");
  const userId = req.params["id"];
  let result = deleteUserById(userId);
  res.send(result);
});

const getAllUsersFilter = (name, job) => {
  return users["users_list"]
    .filter((user) => user["name"] === name)
    .filter((user) => user["job"] === job);
};
