import { Column, HasMany, Model, Table } from "sequelize-typescript";
import Player from "./player";

@Table
export default class Manager extends Model {
  @Column
  declare name: string;
  @HasMany(() => Player)
  declare players: Player[];
}
