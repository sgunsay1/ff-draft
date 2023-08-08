import express, { Request, Response } from "express";
import db from "./config/db.config";
import router from "./routes/todo";

db.sync().then(() => {
  console.log("connected to db");
});

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(router);

app.get("/", (req: Request, res: Response) => res.send("hello world"));

app.listen(PORT, () => {
  console.log("backend server is running on port " + PORT);
});
