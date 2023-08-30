import Player, { IPlayer } from "./player";
import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export type TeamName =
  | "ARI"
  | "ATL"
  | "BAL"
  | "BUF"
  | "CAR"
  | "CHI"
  | "CIN"
  | "CLE"
  | "DAL"
  | "DEN"
  | "DET"
  | "GB"
  | "HOU"
  | "IND"
  | "JAX"
  | "KC"
  | "MIA"
  | "MIN"
  | "NE"
  | "NO"
  | "NYG"
  | "NYJ"
  | "LV"
  | "PHI"
  | "PIT"
  | "LAC"
  | "SF"
  | "SEA"
  | "LAR"
  | "TB"
  | "TEN"
  | "WAS"
  | "NULL";

export type Bye = 0 | 5 | 6 | 7 | 9 | 10 | 11 | 13 | 14;
export interface INflTeam {
  name: TeamName;
  bye: Bye;
}
@Table
export default class NflTeam extends Model {
  @PrimaryKey
  @Column
  declare name: string;
  @Column
  declare bye: number;

  @HasMany(() => Player)
  declare players: Player[];
}
