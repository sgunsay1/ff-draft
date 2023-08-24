import { Column, HasMany, Model, Table } from "sequelize-typescript";
import Player, { IPlayer } from "./player";

export interface IManager {
  name: string;
  players?: IPlayer[];
}

@Table
export default class Manager extends Model implements IManager {
  @Column
  declare name: string;
  @HasMany(() => Player)
  declare players: Player[];
}
