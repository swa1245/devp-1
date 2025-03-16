import express from "express";
import { Request, Response } from "express";
import { client } from "@repo/db/client";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/signup", async (req:Request, res:Response) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    const user = await client.user.create({
      data: {
        username,
        password
      }
    });

    res.json({
      message: "success",
      id: user.id
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Error creating user"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
