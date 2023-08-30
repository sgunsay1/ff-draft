import { parse } from "csv-parse";
import db from "../config/db.config";
import fs from "fs";
import NflTeam from "../models/nflTeam";
import Manager from "../models/manager";
import Player, { Position } from "../models/player";

db.sync().then(async () => {
  console.log("connected to db");
  await generateTeams();
  await generateManagers();
  await generatePlayers();
  await generateAdp();
});

const generateTeams = async () =>
  new Promise((resolve, reject) => {
    console.log("Seeding Teams");
    const teams: Promise<NflTeam>[] = [];
    fs.createReadStream("./src/seeders/team.csv")
      .pipe(parse({ delimiter: "," }))
      .on("data", (row) =>
        teams.push(new NflTeam({ name: row[0], bye: parseInt(row[1]) }).save())
      )
      .on("error", (error) => reject(error.message))
      .on("end", () => resolve(Promise.all(teams)));
  });
const generateManagers = () =>
  new Promise((resolve, reject) => {
    console.log("Seeding Managers");
    const managers: Promise<Manager>[] = [];

    fs.createReadStream("./src/seeders/manager.csv")
      .pipe(parse({ delimiter: "," }))
      .on("data", (row) => managers.push(new Manager({ name: row[0] }).save()))
      .on("error", (error) => reject(error.message))
      .on("end", () => resolve(Promise.all(managers)));
  });

const generatePlayers = () =>
  new Promise((resolve, reject) => {
    console.log("Seeding Players");
    const players: Promise<Player>[] = [];
    fs.createReadStream("./src/seeders/players.csv")
      .pipe(parse({ delimiter: "," }))
      .on("data", (row) =>
        players.push(
          new Player({
            wishlist: false,
            price: 1,
            name: row[0],
            teamName: row[1],
            position: row[2],
            totalPoints: parseFloat(row[3]),
            pointsPerGame: parseFloat(row[4]),
            gamesPlayed: parseInt(row[5]),
            completions: parseInt(row[6]),
            passYards: parseInt(row[7]),
            passTds: parseInt(row[8]),
            interceptions: parseInt(row[9]),
            rushAttempts: parseInt(row[10]),
            rushYards: parseInt(row[11]),
            rushTds: parseInt(row[12]),
            fumbles: parseInt(row[13]),
            targets: parseInt(row[14]),
            receptions: parseInt(row[15]),
            recYards: parseInt(row[16]),
            recTds: parseInt(row[17]),
            adp: 1000,
          }).save()
        )
      )
      .on("error", (error) => reject(error.message))
      .on("end", () => resolve(Promise.all(players)));
  });

const generateAdp = () =>
  new Promise((resolve, reject) => {
    console.log("Seeding ADP");
    const adp: Array<Promise<Player> | undefined> = [];
    fs.createReadStream("./src/seeders/adp.csv")
      .pipe(parse({ delimiter: "," }))
      .on("data", async (row) => {
        try {
          const player = await Player.findOne({ where: { name: row[1] } });
          const adp = parseInt(row[0]);
          if (player) {
            await player?.update({ teamName: row[2], adp });
          } else {
            const positions: Position[] = ["QB", "RB", "WR", "TE", "K", "DST"];
            const position = positions.find((pos) => row[4].startsWith(pos));
            await new Player({
              adp,
              name: row[1],
              teamName: row[2],
              position,
            }).save();
          }
        } catch (e) {
          console.error("error on " + row[1], e);
        }
      })
      .on("error", (error) => reject(error.message));
    // .on("end", () => resolve(Promise.all(adp)));
  });
