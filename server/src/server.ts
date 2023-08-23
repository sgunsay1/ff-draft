import express, { Request, Response } from "express";
import db from "./config/db.config";
import { managerRoutes, nflTeamRoutes, playerRoutes } from "./routes";

db.sync().then(() => {
  console.log("connected to db");
});

const app = express();
const PORT = 3001;

app.use(express.json());
app.use("/manager", managerRoutes);
app.use("/nfl-team", nflTeamRoutes);
app.use("/player", playerRoutes);

app.get("/", (req: Request, res: Response) => res.send("hello world"));

app.listen(PORT, () => {
  console.log("backend server is running on port " + PORT);
});
