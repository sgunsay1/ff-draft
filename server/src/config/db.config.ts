import { Sequelize } from "sequelize-typescript";
import Player from "../models/player";
import NflTeam from "../models/nflTeam";
import Manager from "../models/manager";

const db = new Sequelize("app", "", "", {
  storage: "./db.sqlite",
  dialect: "sqlite",
  logging: false,
  models: [Player, NflTeam, Manager],
});

export default db;
