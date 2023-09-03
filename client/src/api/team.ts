import { Bye, INflTeam, TeamName } from "@models/nflTeam";
import axios from "axios";
const SERVER = "http://127.0.0.1:3001";

export const getTeams = async () =>
  (await axios.get(`${SERVER}/nfl-team`)).data as INflTeam[];

export const generateByeMap = (teams: INflTeam[]) =>
  new Map<TeamName, Bye>(teams.map((team) => [team.name, team.bye]));
