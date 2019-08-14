export default function giveMatchesStadistics(matches, teams) {
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

	// ANDA!
	// console.log(getTeamByPlayer(matches, '5d534d02c5993b0017a4d301'));

	// console.log(
	// 	filterCounterByPlayer(matches, '5d534bf5c5993b0017a4d2d2', 'GOAL')
	// );

	let sTs = [];

	for (const m of matches) {
		let sT1 = { id: m.team1.id, tg: 0, yc: 0, rc: 0 };
		let sT2 = { id: m.team2.id, tg: 0, yc: 0, rc: 0 };
		let p1 = m.team1.players;
		let p2 = m.team2.players;

		p1.forEach(p => {
			sT1.tg += filterCounterByPlayer(m, p, 'GOAL');
			sT1.yc += filterCounterByPlayer(m, p, 'YELLOW_CARD');
			sT1.rc += filterCounterByPlayer(m, p, 'RED_CARD');
		});

		p2.forEach(p => {
			sT2.tg += filterCounterByPlayer(m, p, 'GOAL');
			sT2.yc += filterCounterByPlayer(m, p, 'YELLOW_CARD');
			sT2.rc += filterCounterByPlayer(m, p, 'RED_CARD');
		});

		sTs = [...sTs, { sT1, sT2 }];
	}

	console.log(teams.teams);
	let x = [];
	teams.teams.forEach(t => {
		let tx = (x = [...x]);
	});

	// let x = [];
	// for (const m of sTs) {
	// sTs.filter(({ sT1, sT2 }) => {
	// 	console.log(sT1, sT2);
	// 	return sT1.id === sT2.id;
	// });
	// }

	// let stad = [];
	// let gs = [];
	// let yc = [];
	// let rc = [];

	// for (const m of matches) {
	// 	console.log(m);
	// }

	// matches.forEach(m => {
	// 	let x = m.events.filter(e => e.type === 'GOAL');
	// 	let teams = [];
	// 	x.forEach(x => {
	// 		teams = [...teams, getTeamByPlayer(matches, x.playerId)];
	// 	});
	// 	if (x.length > 0) gs = [...gs, ...teams];
	// 	// if (x.length > 0) gs = [...gs, { _id: m._id }];

	// 	yc = [...yc, m.events.filter(e => e.type === 'YELLOW_CARD')];
	// 	rc = [...rc, m.events.filter(e => e.type === 'RED_CARD')];

	// 	// stad = [...stad, obj];
	// 	// console.log(m.events.filter(e => e.type === 'GOAL'));
	// });
	// console.log(gs);
}

function getTeamByPlayer(matches, pId) {
	let founded = false;

	for (const m of matches) {
		if (!founded) {
			//m is single match
			let psT1 = m.team1.players;
			let psT2 = m.team2.players;

			for (const p of psT1) {
				if (p === pId) founded = true;
			}

			if (founded) {
				return m.team1.id;
			}

			for (const p of psT2) {
				if (p === pId) founded = true;
			}

			if (founded) {
				return m.team2.id;
			}
		}
	}
}

function filterCounterByPlayer(matches, pId, filter) {
	let totalG = 0;

	for (const m of [matches]) {
		//m is single match
		let evts = m.events;

		for (const e of evts) {
			if (e.playerId === pId && e.type === filter) totalG++;
		}
	}
	return totalG;
}

export { giveMatchesStadistics };
