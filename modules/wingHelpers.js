var knex = require('../db/config.js').knex;

function getClientDID(clientID, targetID) {
	return knex('duos')
		.where({uID1: clientID, uID2: targetID})
    .select('ID')
    .then(function(resp) {
      return resp[0].ID;
    })
}

function getTargetDID(targetID, clientID) {
	return knex('duos')
    .where({uID1: targetID, uID2: clientID})
    .select('ID')
    .then(function(id) {
      if (id.length > 0) {
        return id[0].ID;
      }
		})
}

function getCwStatus(duoID) {
	return knex('duos')
		.where('ID', duoID)
		.select('cwStatus')
}

function setActive(duoID) {
	return knex('duos')
    .where('ID', duoID)
    .update({
      cwStatus: 'active'
    })
}

function findOtherDuos(duoID,duoID2) {
	return knex('duos')
	  .where(function() {
	    this.where('ID', duoID)
	    .orWhere('ID', duoID2)
	  })
}

function setPending(targetID,clientID){
	return knex('duos')
  	.where({uID1: targetID, uID2: clientID})
  	.update({ 
  	cwStatus : 'pending' 
  }) 
}


module.exports = {
	getClientDID: getClientDID,
	getTargetDID: getTargetDID,
	getCwStatus: getCwStatus,
	setActive: setActive,
	findOtherDuos: findOtherDuos,
	setPending: setPending
};