import { parse } from "csv-parse";
import db from "../config/db.config";
import fs from "fs";
import NflTeam from "../models/nflTeam";
import Manager from "../models/manager";
import Player, { Position } from "../models/player";

export interface Passing {
  passYds: number;
  passTD: number;
  interceptions: number;
}

export interface Receiving {
  rec: number;
  recYds: number;
  recTds: number;
  recTgts: number;
}

export interface Rushing {
  rushAtt: number;
  rushYds: number;
  rushTds: number;
}

export interface Kicking {
  fg019: number;
  fg2029: number;
  fg3039: number;
  fg4049: number;
  fg50: number;
  fgm019: number;
  fgm2029: number;
  fgm3039: number;
  fgm4049: number;
  fgm50: number;
  pat: number;
}

export interface Defense {
  ptsAllowed: number;
  sack: number;
  safety: number;
  defInt: number;
  fumRec: number;
  defTd: number;
  blkKick: number;
  stopOnDowns: number;
  ydsAllowed: number;
  retTd: number;
}

export interface Offense extends Passing, Receiving, Rushing {
  fumLost: number;
  twoPt: number;
  retTds: number;
}

export interface ScrapedPlayer
  extends Partial<Offense>,
    Partial<Kicking>,
    Partial<Defense> {
  id: string;
  name: string;
  team: string;
  pos: string;
  bye: number;
  tier?: number;
  fantansyPoints: number;
  preRank: number;
  actualRank: number;
  gamesPlayed: number;
  projCost?: number;
}

db.sync().then(async () => {
  console.log("connected to db");
  await generateTeams();
  await generateManagers();
  await generatePlayers();
  console.log("yaba");
});

const generateTeams = async () =>
  new Promise((resolve, reject) => {
    console.log("Seeding Teams");
    const teams: Promise<NflTeam>[] = [];
    fs.createReadStream("./src/seeders/team.csv")
      .pipe(parse({ delimiter: "," }))
      .on("data", (row) => {
        teams.push(new NflTeam({ name: row[0], bye: parseInt(row[1]) }).save());
      })
      .on("error", (error) => reject(error.message))
      .on("end", () => resolve(Promise.all(teams)));
  });
const generateManagers = async () =>
  new Promise((resolve, reject) => {
    console.log("Seeding Managers");
    const managers: Promise<Manager>[] = [];

    fs.createReadStream("./src/seeders/manager.csv")
      .pipe(parse({ delimiter: "," }))
      .on("data", (row) => managers.push(new Manager({ name: row[0] }).save()))
      .on("error", (error) => reject(error.message))
      .on("end", () => resolve(Promise.all(managers)));
  });

const generatePlayers = async () =>
  await new Promise((resolve, reject) => {
    console.log("Seeding Players");
    const file = fs.readFileSync("./src/seeders/players.json", "utf8");
    const players = JSON.parse(file).map((player: ScrapedPlayer) => {
      const ppg = (player.fantansyPoints / player.gamesPlayed).toFixed(2);
      return new Player({
        wishlist: false,
        price: 0,
        tier: player.tier,
        suggestedPrice: player.projCost,
        name: player.name,
        teamName: player.team,
        position: player.pos,
        totalPoints: player.fantansyPoints,
        pointsPerGame: ppg == "NaN" ? undefined : ppg,
        gamesPlayed: player.gamesPlayed,
        completions: 0,
        passYards: player.passYds,
        passTds: player.passTD,
        interceptions: player.interceptions,
        rushAttempts: player.rushAtt,
        rushYards: player.rushYds,
        rushTds: player.rushTds,
        fumbles: player.fumLost,
        targets: player.recTgts,
        receptions: player.rec,
        recYards: player.recYds,
        recTds: player.recTds,
        adp: player.preRank,
      }).save();
    });

    resolve(Promise.all(players));
  });
