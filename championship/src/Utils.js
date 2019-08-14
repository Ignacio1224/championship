export default function giveMatchesStadistics(matches) {
	/*
		[{
			team: {
				_id,
				pts,
				favGoals,
				fp
			}
		}]
	*/

	// let stad = [];
	let gs = [];
	let yc = [];
	let rc = [];

	matches.forEach(m => {
		let x = m.events.filter(e => e.type === 'GOAL');
		let teams = [];
		x.forEach(x => {
			teams = [...teams, getTeamByPlayer(matches, x.playerId)];
		});
		if (x.length > 0) gs = [...gs, ...teams];
		// if (x.length > 0) gs = [...gs, { _id: m._id }];

		yc = [...yc, m.events.filter(e => e.type === 'YELLOW_CARD')];
		rc = [...rc, m.events.filter(e => e.type === 'RED_CARD')];

		// stad = [...stad, obj];
		// console.log(m.events.filter(e => e.type === 'GOAL'));
	});
	console.log(gs);
}

function getTeamByPlayer(matches, pId) {
	let t1 = [],
		t2 = [];

	for (const m of matches) {
		t1 = m.team1.players.filter(p => p === pId);
		t2 = m.team2.players.filter(p => p === pId);

		if (t1.length > 0) return t1[0];

		if (t2.length > 0) return t2[0];
	}
}

export { giveMatchesStadistics };
