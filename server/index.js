import express from 'express'
import playerRoutes from './routes/players.js'
import managerRoutes from './routes/managers.js'
import { db } from './database/database.js'
import cors from 'cors'
import bodyParser from 'body-parser'

db.authenticate().then(() => console.log('db connected')).catch((err) => console.log("error: ", err))

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors())

app.get('/test', (req, res) => res.send("hello"))

app.use('/players', playerRoutes)
app.use('/managers', managerRoutes)


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})