const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import the classes
const { UserCreator } = require("./objects");

// Init app
const app = express();
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });
app.use(
  cors({
    origin: "*",
  })
);

let users = [];

// Routes
app.get("/", (req, res) => {
  res.send(users);
});

app.post("/", bodyParserJSON, (req, res) => {
  // create new UserCreator
  const user = new UserCreator(req.body.name);
  users.push(user);
  res.send(user);
});

app.put("/:name", bodyParserJSON, (req, res) => {
  // find the user
  const user = users.find((user) => user.name === req.params.name);
  if (!user) return res.status(404).send("User not found" + req.params.name);

  // action on the score
  if (req.body.action === "increment") {
    user.increment();
  } else if (req.body.action === "decrement") {
    user.decrement();
  } else if (req.body.action === "changeName") {
    user.changeName(req.body.name);
  }
  res.send(users);
});

app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
