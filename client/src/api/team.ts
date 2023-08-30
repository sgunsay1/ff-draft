import { INflTeam } from "@models/nflTeam";
import axios from "axios";
const SERVER = "http://127.0.0.1:3001";

export const getTeams = async () =>
  (await axios.get(`${SERVER}/nfl-team`)).data as INflTeam[];
