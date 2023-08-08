import { Sequelize } from 'sequelize';
import { managerAttributes } from '../model/manager.js';
import { playerAttributes, populatePlayers } from '../model/player.js'


const db = new Sequelize("database", "user", "password", {
    dialect: 'sqlite',
    storage: 'database/database.sqlite'
});

const Manager = db.define("Manager", managerAttributes, { timestamps: false })
const Player = db.define("Player", playerAttributes, { timestamps: false })

Manager.hasMany(Player)
Player.hasOne(Manager)
await db.sync();
await populateTables();

async function populateTables() {
    await populatePlayers()
}

export {
    db, Manager, Player
}