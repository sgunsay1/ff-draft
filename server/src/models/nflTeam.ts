import Player from "./player";
import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

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
