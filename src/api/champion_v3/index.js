//import React from 'react';
const kayn = require('./../setting');

getChampionFreeWeek = async (req, res) => {

  const body = await kayn.kaynObject.DDragon.Champion.listDataByIdWithParentAsId()
  const ids = await kayn.kaynObject.Champion.Rotation.list().region(kayn.regions.NORTH_AMERICA)
  
  var names = [];

  ids.freeChampionIds.toString().split(',').forEach(id => {
    Object.keys(body.data).forEach(id_fetched => {
      if (id == id_fetched){
            let data = body.data[id_fetched];
            names.push({data});
      }
    })
  })

  return res.send({names})
}


module.exports = {
      getChampionFreeWeek,
}
