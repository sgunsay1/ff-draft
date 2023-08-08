// @ts-nocheck
import express, { Router } from 'express'
import { Manager, Player } from '../database/database.js'

const router = express.Router()

router.get('/', (req, res) =>
    Manager.findAll()
        .then(managers => {
            res.json(managers)
        }).catch(err => console.log(err)))

router.post('/', (req, res) => {
    try {
        Manager.create(req.body)
        res.send(200)
    }
    catch (e) {
        res.status(500).send(e.mossage);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const manager = await Manager.findByPk(req.params.id)
        await manager.destroy()
        res.sendStatus(200)
    }
    catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})


router.post('/draft', async (req, res) => {
    try {
        let { managerId, playerId } = req.body
        const manager = await Manager.findByPk(managerId)
        const player = await Player.findByPk(playerId)
        const currPlayers = await manager.getPlayers()
        manager.setPlayers([...currPlayers, player])
        res.sendStatus(200)
    }
    catch (e) {
        console.error(e)
        res.status(500).send(e.mossage);
    }
})

router.post('/undraft', async (req, res) => {
    try {
        let { managerId, playerId } = req.body
        const manager = await Manager.findByPk(managerId)
        const player = await Player.findByPk(playerId)
        manager.removePlayers([player])
        res.sendStatus(200)
    }
    catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
})



export default router