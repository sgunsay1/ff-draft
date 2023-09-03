import { TeamName } from "@models/nflTeam";
import { IPlayer } from "@models/player";
import axios from "axios";
const SERVER = "http://127.0.0.1:3001/player";

export const getPlayers = async () =>
  (await axios.get(`${SERVER}`)).data as IPlayer[];

export const toggleWish = (id: number, wishlist: boolean) =>
  axios.put(`${SERVER}/${id}`, { wishlist: !wishlist });

export const purchasePlayer = (
  managerId: number,
  playerId: number,
  bid: number
) =>
  axios.put(`${SERVER}/${playerId}`, {
    managerId: managerId,
    price: bid,
    wishlist: false,
  });

export const getTeamHref = (team: TeamName) =>
  `https://www.espn.com/nfl/team/depth/_/name/${team === "WAS" ? "wsh" : team}`;

export const getPlayerNewsHref = (player: string) => {
  const reducedName = player.split(" ").slice(0, 2).join("-").toLowerCase();
  return `https://www.fantasypros.com/nfl/players/${reducedName}.php`;
};
