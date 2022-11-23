import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

// * Middlewares
// Call morgan globally
app.use(morgan("dev"));
// Express handles JSON from the client
app.use(express.json());
// Breaks down url query strings into an object
app.use(express.urlencoded({ extended: true }));
// Custom middleware - adding a action to the request (globally)
app.use((req, res, next) => {
  console.log("Middleware");
  next();
});
const customLogger = (message) => (req, res, next) => {
  console.log(`Hello ${message}`);
  next();
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// * Routes
// use is a method that calls a middleware to a url path
app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);

export default app;
