import prisma from "../db";
import { hashPassword, createJWT, comparePasswords } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req, res) => {
  // Validate the user
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  // compare the password
  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
  // Allow user to login
  const token = createJWT(user);
  res.json({ token });
};
