// init express
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Sequelize, Model, DataTypes } from "sequelize";

dotenv.config();
const app = express();

// json express
app.use(express.json());
app.use(bodyParser.json());

console.log(process.env.DATABASE_URL);

// init sequelize using pg
const sequelize = new Sequelize(
  `postgresql://${process.env.DATABASE_URL}@localhost:5432/sequelize`
);

// define model
class User extends Model {}
User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "user",
  }
);

// create table
sequelize.sync();

// create user
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.send(user);
});

// get all users
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

// listen to port
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
