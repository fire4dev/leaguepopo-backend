const kayn = require('./../setting');
const fetch = require('node-fetch')

getSummonerInfo = (req, res) => {
  const {server} = req.params;
  const urlProfileIcon = 'http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/';
  getSummonerId(req).then(data => {
    getSummonerLeague(server, data.id).then(league => {
      getSummonerMatch(server, data.accountId).then(match => {
        getAllSummonerMatchData(match.matches).then(matchInfo => {
          res.json({
            summonerId: data.id,
            summonerName: data.name,
            summonerLevel: data.summonerLevel,
            ImgURL: urlProfileIcon+data.profileIconId+'.png',
            league,
            matchInfo
          });
        })
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
  }).catch(err => console.log(err))
}


getAllSummonerMatchData = async (m) => {
  var array = []
  m.forEach(async matchIds => {
    array.push(returnMatchParams(matchIds.gameId))
  })
  return array
} 

returnMatchParams = async (id) => {
  return await kayn.kaynObject.Match.get(id)
}


getSummonerMatch = async (server, id) => {
  return await kayn.kaynObject.Matchlist.by.accountID(id).region(kayn.regions[server])
}

getSummonerLeague = async (server, id) => {
  return await kayn.kaynObject.League.Entries.by.summonerID(id).region(kayn.regions[server]);
}

getSummonerId = async (req) => {
  const {server, summonerName} = req.params;
  return await kayn.kaynObject.Summoner.by.name(summonerName).region(kayn.regions[server]);
}

//         TFT DATA           //
// const tftmatch = `https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/L4YT-Xjeczf4h6eJTqiMv2VLEGnDezs3e3glj73gnTcbj6JfHHHSLa-grdZICrQj6Dl6Uc-Dmg90xA/ids?count=20&api_key=RGAPI-f84120c7-9c8f-475d-890c-f0692fd50849`
// fetch(tftmatch)
// .then(response => response.json())
// .then(match => console.log(match))

module.exports = {
  getSummonerInfo,
}
