import {client} from "@repo/db/client";
import express from "express"
const app = express()
app.use(express.json());


app.post("/signup",async (req, res) => {
  
  const { username, password } = req.body;
  const user = await client.user.create({
    data: {
      username,
      password,
    },
  }); 

  console.log("User created:", user);

  if (user) {
    res.status(201).send("User created successfully");
  } else {
    res.status(500).send("Error while creating user");
  }
  
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3001");
});
