import { parse } from "csv-parse";
import db from "../config/db.config";
import fs from "fs";
import NflTeam from "../models/nflTeam";
import Manager from "../models/manager";
import Player, { Position } from "../models/player";

db.sync().then(async () => {
  console.log("connected to db");

  const players = await Player.findAll();
  // const managers = await Manager.findAll();
  // const updates = managers.map(async (manager) => {
  //   await manager.update({
  //     players: [],
  //   });
  // });

  // await Promise.all(updates);
  for (const player of players) {
    console.log(player);
    await player.update({
      price: 0,
      managerId: null,
    });
  }
});
