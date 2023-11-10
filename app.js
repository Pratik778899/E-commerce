import express from "express";
import cors from "cors";

import { getUsers, getUser, register } from "./database.js";

const app = express();
app.use(cors());

app.use(express.json())

app.get("/users", async (req, res) => {
  const { email, password } = req.query; // Use req.query to access query parameters
  console.log({ email, password});
  const users = await getUsers(email, password);
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

// app.post("/login" , async(req ,res) => {
//   const {email , password} = req.body;
//   const user = await login(email , password);
//   if (user) {
//     res.send(user);
//   }else{
//     res.status(401).json({ error: "Invalid email or password" });
//   }
// })

app.post("/users", async (req, res) => {
  const {fullname , email , password} = req.body
  const user = await register(fullname , email , password)
  res.status(201).send(user);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke! (●'◡'●)    ");
});

app.listen(8081, () => {
  console.log("server is running on port 8081");
});



