const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8000;

const { getChampionFreeWeek } = require('./api/champion_v3');
const { getSummonerInfo, getAllSummonerMatchData } = require('./api/summoner_v4');

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/api/champion/freeweek', getChampionFreeWeek);
app.get('/api/dashboard/:server/:summonerName', getSummonerInfo);
// app.get('/api/dashboard/match-history', getAllSummonerMatchData);

app.listen(port, () => console.log(`Server running at 'http://localhost:${port}/'`));
