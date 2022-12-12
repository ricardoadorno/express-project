import express from "express";
import bodyParser from "body-parser";

import { PrismaClient } from "@prisma/client";

const app = express();

// create prisma client
const prisma = new PrismaClient();

app.use(bodyParser.json());

// get name from request body from the prisma client
const createUser = async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json(user);
};

// get all users from the prisma client
const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// handler for the route create user
app.post("/users", createUser);

// handler for the route get users
app.get("/users", getUsers);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
