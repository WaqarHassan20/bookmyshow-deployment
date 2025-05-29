import {client} from "@repo/db/client";
import express from "express"
const app = express()
app.use(express.json());


app.post("/signup", async (req, res) => {
  console.log("BODY:", req.body);
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);

  try {
    const user = await client.user.create({
      data: {
        username,
        password,
      },
    });

    console.log("User created:", user);
    res.status(201).send({ msg: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error while creating user");
  }
});


app.get("/getMsg", async (req, res) => {
  const user = await client.user.findFirst();
  console.log("User:", user);
  res.send({
    msg: "this is the getmsg endpoint",
    user: user,
  });
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
