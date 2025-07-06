import { Sequelize } from "sequelize-typescript";
import Player from "../models/player";
import NflTeam from "../models/nflTeam";
import Manager from "../models/manager";

const DB = {
  db_2023: "./db2023.sqlite",
  db_curr: "./db.sqlite",
};

const db = new Sequelize("app", "", "", {
  storage: DB.db_curr,
  dialect: "sqlite",
  logging: false,
  models: [Player, NflTeam, Manager],
});

export default db;
