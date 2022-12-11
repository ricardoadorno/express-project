const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import the classes
const { UserCreator, QuestTracker } = require("./objects");

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
  const user = new UserCreator(req.body.name, req.body.age);
  // create new QuestTracker
  const questTracker = new QuestTracker(req.body.name);
  // add questTracker to user
  user.questTracker = questTracker;
  // add user to users
  users.push(user);
  res.send(user);
});

app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
