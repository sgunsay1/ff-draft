import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Player, { IPlayer } from "./player";

export interface IManager {
  id: number;
  name: string;
  players?: IPlayer[];
}

@Table
export default class Manager extends Model implements IManager {
  @PrimaryKey
  @Column
  declare id: number;
  @Column
  declare name: string;
  @HasMany(() => Player)
  declare players: Player[];
}
