import db from "../config/db.config";
import NflTeam from "./nflTeam";
import Manager from "./manager";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

@Table
export default class Player extends Model {
  @Column
  declare wishlist: boolean;
  @Column
  declare price: number;
  @Column
  declare name: string;
  @Column
  declare adp: number;
  @Column
  declare position: string;
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
  declare teamName: string;
  @BelongsTo(() => NflTeam, "teamName")
  declare team: NflTeam;

  // Manager associations
  @Column
  @ForeignKey(() => Manager)
  declare managerId?: number;
  @BelongsTo(() => Manager, "managerId")
  declare manager?: Manager;
}
