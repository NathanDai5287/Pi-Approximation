var points = {
	x: [],
	y: [],
	marker: {
		color: [],
	},

	mode: 'markers',
	type: 'scatter',
};

var approximations = {
	x: [],
	y: [],
	type: 'scatter',
}

const layout = {
	title: 'Unit Square',
	// xaxis: {
		// 	title: 'x axis',
		// },
		// yaxis: {
			// 	title: 'y axis',
			// },

			xaxis: {
				autotick: false,
				tick0: 0,
				dtick: 0.1,
				range: [0, 1],
			},
			yaxis: {
				autotick: false,
				tick0: 0,
		dtick: 0.1,
		range: [0, 1],
	}
}

const linelayout = {
	title: 'Approximation',
	xaxis: {
		title: 'n',
		autotick: false,
		tick0: 1,
		dtick: 1,
		range: [1, 10],
	},
	yaxis: {
		title: 'Approximation',
		autotick: false,
		tick0: 0,
		dtick: 0.5,
		range: [0, 4],
	},
}

const MAINID = 'scatter';
const LINEID = 'line';

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		if (x ** 2 + y ** 2 <= 1) {
			this.color = 'red';
			circle++;
		} else {
			this.color = 'blue';
		}
	}
};


var npoints = 0;
var circle = 0;

function update_approximation(approximation) {
	approximations['x'].push(npoints);
	approximations['y'].push(approximation);
	linelayout['xaxis']['range'][1] = npoints;
	linelayout['xaxis']['dtick'] = Math.floor(npoints / 10);

	Plotly.newPlot(LINEID, [approximations], linelayout);
}

function plot(points, id) {
	// Plotly.newPlot(id, [points], layout);
	Plotly.redraw(id);
	document.getElementById('npoints').innerText = npoints;

	var approximation = circle / npoints * 4
	document.getElementById('approximation').innerText = approximation;
	update_approximation(approximation);
}

function generate() {
	npoints++;

	let x = Math.random(); let y = Math.random();
	let point = new Point(x, y);

	points['x'].push(point.x);
	points['y'].push(point.y);
	points['marker']['color'].push(point.color);

	plot(points, MAINID);
}

var generating;
function repeat(bfirst) {
	if (!bfirst) {
		generate();
	}

	generating = setTimeout(function() {
		// for (let i = 0; i < npoints / 20 + 1; i++) {
			repeat(false);
		// }
	}, 500 / npoints + 1);
}

function stop() {
	clearTimeout(generating);
}

function handler() {
	var button = document.getElementById('generate');
	button.addEventListener('mousedown', function() {repeat(true)});

	button.addEventListener('mouseup', stop);
}

handler();
Plotly.newPlot(MAINID, [points], layout);
Plotly.newPlot(LINEID, [approximations], linelayout);
