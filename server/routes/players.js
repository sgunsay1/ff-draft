import express from 'express'
// @ts-ignore
import { Player } from '../database/database.js'
import fs from 'fs'

const router = express.Router()

router.get('/', (req, res) =>
    Player.findAll()
        .then(players => {
            res.json(players)
        }).catch(err => console.log(err)))

router.post('/wishlist', async (req, res) => {
    try {
        const { playerId, addToList } = req.body
        const player = await Player.findByPk(playerId)
        await player.update({ wishlisted: addToList })
        res.send(200)
    }
    catch (e) {
        console.log(e)
        res.send(500)
    }
})



export default router