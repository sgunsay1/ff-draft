import { DataTypes } from 'sequelize';
import { Player } from '../database/database.js';
import fs from 'fs'

const teams = ["ARI", "ATL", "BAL", "BUF", "CAR", "CHI", "CIN", "CLE", "DAL", "DEN", "DET", "GB", "HOU", "IND", "JAX", "KC", "MIA", "MIN", "NE", "NO", "NYG", "NYJ", "LV", "PHI", "PIT", "LAC", "SF", "SEA", "LAR", "TB", "TEN", "WAS"]

const positions = ["QB", "RB", "WR", "TE", "K", "DST"]

export const playerAttributes = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    playerName: DataTypes.STRING,
    team: DataTypes.ENUM(teams),
    position: DataTypes.ENUM(positions),
    age: DataTypes.TINYINT,
    passingAtt: DataTypes.TINYINT,
    passingTds: DataTypes.TINYINT,
    passingYards: DataTypes.TINYINT,
    targets: DataTypes.TINYINT,
    receptions: DataTypes.TINYINT,
    receivingYds: DataTypes.TINYINT,
    receivingTds: DataTypes.TINYINT,
    rushingYds: DataTypes.TINYINT,
    rushingAtt: DataTypes.TINYINT,
    rushingTds: DataTypes.TINYINT,
    interceptions: DataTypes.TINYINT,
    fumbles: DataTypes.TINYINT,
    fumblesLost: DataTypes.TINYINT,
    points: DataTypes.DOUBLE,
    wishlisted: DataTypes.BOOLEAN,
}

export const populatePlayers = async () => {
    if ((await Player.count()) > 0)
        return

    fs.readFile('data/2021-stats.csv', 'utf8', (err, data) => {
        const lines = data.split('\n');
        lines.shift()
        lines.forEach(line => {
            const tokens = line.split(',');
            tokens.shift();
            const playerInfo = {
                playerName: tokens[0],
                team: tokens[1],
                position: tokens[2],
                age: parseInt(tokens[3]),
                //4 5
                targets: parseInt(tokens[6]),
                receptions: parseInt(tokens[7]),
                passingYards: parseInt(tokens[8]),
                passingTds: parseInt(tokens[9]),
                passingAtt: parseInt(tokens[10]),
                rushingYds: parseInt(tokens[11]),
                rushingTds: parseInt(tokens[12]),
                rushingAtt: parseInt(tokens[13]),
                receivingYds: parseInt(tokens[14]),
                receivingTds: parseInt(tokens[15]),
                // 16
                interceptions: parseInt(tokens[17]),
                fumbles: parseInt(tokens[18]),
                fumblesLost: parseInt(tokens[19]),
                wishlisted: false,
            }

            Player.create({ ...playerInfo, points: getPoints(playerInfo) })
        })
    })
}

const getPoints = ({ passingYards, passingTds, rushingYds, rushingTds, receptions, receivingYds, receivingTds, interceptions, fumblesLost }) => {
    return passingYards / 25 +
        passingTds * 4 +
        rushingYds / 10 +
        rushingTds * 6 +
        receptions +
        receivingYds / 10 +
        receivingTds * 6 -
        fumblesLost * 2 -
        interceptions * 2
}


