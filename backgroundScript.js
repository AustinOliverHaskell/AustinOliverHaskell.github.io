// Background Scrips - Created by Austin Haskell 
//    5/15/2017


// ----- Constants -----
const BACKGROUND_COLOR = 255;
const FRAME_RATE  = 60;
// ---------------------

var form = new shape(10, 10000, 'rgba(0, 0, 50, 0.1)');
var form2 = new shape(100, 100000, 'rgba(150, 50, 50, 0.1)');
var form3 = new shape(1000, 1000000, 'rgba(0, 0, 50, 0.1)');


function setup()
{
	// Create our workspace
	createCanvas(windowWidth, windowHeight);

	form.init();
	form2.init();
	form3.init();

	frameRate(FRAME_RATE);

	background(BACKGROUND_COLOR);

}


function draw()
{


	form.step();
	form.show();

	form2.step();
	form2.show();

	form3.step();
	form3.show();
}







// ----- Objects -----
function shape(x, y, color)
{
	this.xOffset = x;
	this.yOffset = y;
	this.scaleOffset = 10000
	this.scaleFactor = 400;
	this.minSize = 10;
	this.speed = 8;
	this.radius = 1000;

	this.init = function()
	{
		// The 100 makes the circle start off screen
		this.points = new createVector(-50, windowHeight/2);
	}

	this.step = function()
	{
	
		this.points.y = (noise(this.yOffset) * windowHeight);
		this.points.x += this.speed;

		this.xOffset += 0.02;
		this.yOffset += 0.02;

		//if (this.points.x > windowWidth + 200)
		//{
		//	this.points.x = 0;
		//}

	}

	this.morph = function()
	{

	}

	this.show = function()
	{

		stroke(color);
		noFill();
		strokeWeight(2);


		ellipse(this.points.x, this.points.y, noise(this.scaleOffset) * this.scaleFactor, noise(this.scaleOffset) * this.scaleFactor);

		this.scaleOffset += 0.02;
	}
}



// -------------------