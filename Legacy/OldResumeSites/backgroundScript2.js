// Background 2 JS
// Austin Haskell 5/21/2017

// Refactor this

p5.disableFriendlyErrors = false;

const TIME_LIMIT = 30000;

var timeOffset = 0;
var increment = 0.05;
var scl = 40;
var cols = 0;
var rows = 0;

var startTime;

var flowField = [];
var particles = [];

function setup()
{
	createCanvas(windowWidth, windowHeight);
	rows = height / scl;
	cols = width  / scl;

	background(51);

	startTime = millis();

	createFlow();

	for (var i = 0; i < width/12; i++)
	{
		particles[i] = new Particle();
	}
}

function draw()
{
	//background(255);

	for (var i = 0; i < particles.length; i++)
	{
		particles[i].follow(flowField);
		particles[i].update();
		particles[i].show();
		particles[i].wrap();
	}

	createFlow();

	if (millis() - startTime  > TIME_LIMIT)
	{
		noLoop();
	}

}


function Particle()
{
	this.pos = createVector(random(width),random(height));
	this.lastPos = this.pos.copy();
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.maxSpeed = 8;



	this.update = function()
	{
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.applyForce = function(force)
	{
		this.acc.add(force);
	}

	this.show = function()
	{
		stroke('rgba(255, 255, 255, 0.1)');

		//ellipse(this.pos.x, this.pos.y, 20, 20);
		line(this.pos.x, this.pos.y, this.lastPos.x, this.lastPos.y);
		this.lastPos.x = this.pos.x;
		this.lastPos.y = this.pos.y;


	}

	this.wrap = function()
	{
		if (this.pos.x > width)
		{
			this.pos.x = 0;
			this.lastPos.x = this.pos.x;
		}
		else if (this.pos.x < 0)
		{
			this.pos.x = width;
			this.lastPos.x = this.pos.x;
		}

		if (this.pos.y > height)
		{
			this.pos.y = 0;
			this.lastPos.y = this.pos.y;
		}
		else if (this.pos.y < 0)
		{
			this.pos.y = height;
			this.lastPos.y = this.pos.y;
		}
	}

	this.follow = function()
	{
		var x = floor(this.pos.x / scl);
		var y = floor(this.pos.y / scl);

		var index = x + y * cols;

		var force = flowField[index];

		this.applyForce(force);
	}
}

function createFlow()
{
	var yoffset = 100;

	for (var y = 0; y < rows; y++)
	{
		var xoffset = 1;

		for (var x = 0; x < cols; x++)
		{
			var index = (y*cols + x);

			var value = noise(xoffset, yoffset, timeOffset);

			var vec = p5.Vector.fromAngle(value * TWO_PI);
			vec.setMag(1);
			flowField[index] = vec;

			stroke(0);

			//push();
			//translate(x*scl, y * scl);
			//rotate(vec.heading());
			//line(0, 0, scl, 0);
			//pop();

			xoffset += increment;
		}

		yoffset += increment;
	}	

	timeOffset += 0.003;
}