import db from "../config/db.config";
import NflTeam, { TeamName } from "./nflTeam";
import Manager from "./manager";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export type Position = "QB" | "RB" | "WR" | "TE" | "K" | "DST";

export interface IPlayer {
  id: number;
  wishlist: boolean;
  price: number;
  name: string;
  adp: number;
  position: Position;
  totalPoints: number;
  pointsPerGame: number;
  gamesPlayed: number;
  completions: number;
  passYards: number;
  passTds: number;
  interceptions: number;
  rushAttempts: number;
  rushYards: number;
  rushTds: number;
  targets: number;
  receptions: number;
  recYards: number;
  recTds: number;
  fumbles: number;
  teamName: TeamName;
  managerId?: number;
}

@Table
export default class Player extends Model implements IPlayer {
  @PrimaryKey
  @Column
  declare id: number;
  @Column
  declare wishlist: boolean;
  @Column
  declare price: number;
  @Column
  declare name: string;
  @Column
  declare adp: number;
  @Column
  declare position: Position;
  @Column
  declare totalPoints: number;
  @Column
  declare pointsPerGame: number;
  @Column
  declare gamesPlayed: number;
  @Column
  declare completions: number;
  @Column
  declare passYards: number;
  @Column
  declare passTds: number;
  @Column
  declare interceptions: number;
  @Column
  declare rushAttempts: number;
  @Column
  declare rushYards: number;
  @Column
  declare rushTds: number;
  @Column
  declare targets: number;
  @Column
  declare receptions: number;
  @Column
  declare recYards: number;
  @Column
  declare recTds: number;
  @Column
  declare fumbles: number;

  // NFL-Team associations
  @Column
  @ForeignKey(() => NflTeam)
  declare teamName: TeamName;
  @BelongsTo(() => NflTeam, "teamName")
  declare team: NflTeam;

  // Manager associations
  @Column
  @ForeignKey(() => Manager)
  declare managerId?: number;
  @BelongsTo(() => Manager, "managerId")
  declare manager?: Manager;
}
