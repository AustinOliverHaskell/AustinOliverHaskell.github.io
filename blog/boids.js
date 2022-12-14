const max_velocity = 20;
const max_acceleration = 1;
const sight_range = 60;

class Boid {
	constructor(position, velocity, acceleration) {
		this.position     = position;
		this.velocity     = velocity;
		this.acceleration = acceleration;
		this.rotation     = 0;
	}

	update(screen_width, screen_height, boid_list) {

		this.acceleration = zero_vector();

		var flockmates = this.look_for_flockmates(boid_list); 
		var average_position_of_flockmates = this.calculate_average_position_of_flockmates(flockmates);
		var average_heading_of_flockmates  = this.calculate_average_heading_of_flockmates(flockmates);

		if (flockmates.length != 0)
		{	
			this.acceleration.x = (average_position_of_flockmates.x - this.position.x);
			this.acceleration.y = (average_position_of_flockmates.y - this.position.y);

			if (this.acceleration.x > max_acceleration) {
				this.acceleration.x = max_acceleration;
			} else if (this.acceleration.x < -max_acceleration) {
				this.acceleration.x = -max_acceleration;
			}

			if (this.acceleration.y > max_acceleration) {
				this.acceleration.y = max_acceleration; 
			} else if (this.acceleration.y < -max_acceleration) {
				this.acceleration.y = -max_acceleration;
			}

			console.log("acceleration is " + this.acceleration.x + ", " + this.acceleration.y);
		}

		this.position = this.position.add(this.velocity);
		this.velocity = this.velocity.add(this.acceleration);

		if (this.velocity.x > max_velocity) {
			this.velocity.x = max_velocity;
		}

		if (this.velocity.y > max_velocity) {
			this.velocity.y = max_velocity; 
		}

		if (this.position.x > screen_width) {
			this.position.x -= screen_width;
		}

		if (this.position.y > screen_height) {
			this.position.y -= screen_height; 
		}

		if (this.position.x < 0) {
			this.position.x += screen_width
		}

		if (this.position.y < 0) {
			this.position.y += screen_height
		}


		this.rotation = (Math.atan2((this.velocity.y), (this.velocity.x)) - Math.atan2(1, 0)) - 3.14;
	}

	look_for_flockmates(boid_list) {
		var flockmates = [];
		for (var boid of boid_list) {
			if (boid.position == this.position) {
				continue; 
			}

			if (this.position.distance_between(boid.position) < sight_range) {
				flockmates.push(boid.clone());
			}
		}
		return flockmates;
	}

	calculate_average_position_of_flockmates(flockmates) {
		var average_point = zero_vector();

		if (flockmates.length == 0) {
			return average_point;
		}

		for (var boid of flockmates) {
			average_point.x += boid.position.x;
			average_point.y += boid.position.y;
		}

		average_point.x = average_point.x / flockmates.length; 
		average_point.y = average_point.y / flockmates.length;

		return average_point;
	}

	calculate_average_heading_of_flockmates(flockmates) {
		var average_heading = zero_vector();

		if (flockmates.length == 0) {
			return average_heading;
		}

		for (var boid of flockmates) {
			average_heading += boid.rotation;
		}

		average_heading= average_heading / flockmates.length;

		return average_heading;
	}

	calculate_avoidance_of_flockmates(flockmates) {
		
	}

	draw(canvas, color) {
		draw_boid(canvas, this.position.x, this.position.y, this.rotation, 4, color);
	}

	clone() {
		return new Boid(this.position, this.velocity, this.acceleration);
	}
}

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Vector {
	constructor(x_component, y_component) {
		this.x = x_component;
		this.y = y_component;
	}

	add(other_vector) {
		return new Vector(this.x + other_vector.x, this.y + other_vector.y);
	}

	distance_between(other_point) {
		return Math.sqrt(Math.pow(other_point.x - this.x, 2) + Math.pow(other_point.y - this.y, 2));
	}

	rotate(angle) {
		return new Vector(Math.abs(Math.cos(angle * this.x) - Math.sin(angle * this.y)), Math.abs(Math.sin(angle * this.x) + Math.cos(angle * this.y)));
	}
}

function random_vector() {
	var x = Math.random(); 
	x = x * (Math.random() < 0.5 ? -1 : 1);

	var y = Math.random(); 
	y = y * (Math.random() < 0.5 ? -1 : 1);
	return new Vector(x, y);
}

function zero_vector() {
	return new Vector(0, 0);
}

function draw_boid(canvas, x, y, rotation, scale, color) {	

	var boid_points = [];

	var center_point = scale_point(new Point(0.5, 0.5), scale); 

	boid_points.push(rotate_point(scale_point(new Point(0.5, 0), scale), center_point, rotation));
	boid_points.push(rotate_point(scale_point(new Point(0, 1), scale), center_point, rotation));
	boid_points.push(rotate_point(scale_point(new Point(0.5, 0.8), scale), center_point, rotation));
	boid_points.push(rotate_point(scale_point(new Point(1, 1), scale), center_point, rotation));

	draw_path(canvas, boid_points, x, y, scale, color);
}

function draw_path(canvas, point_list, x, y, scale, color) {
	var context = canvas.getContext("2d");

	context.strokeStyle = color;
	context.beginPath();
	context.moveTo(point_list[0].x * scale + x, point_list[0].y * scale + y);
	for (var i = 0; i < point_list.length; i++) {
		context.lineTo(x + point_list[i].x * scale, y + point_list[i].y * scale); 
	}
	context.lineTo(point_list[0].x * scale + x, point_list[0].y * scale + y);
	context.stroke();
}

function rotate_point(point, pivot, radians) {

	//var radians = degrees_to_radians(angle);

	// console.log("Rotating point " + point + " by " + radians_to_degrees(radians)  + " degrees around " + pivot);

	var sine   = Math.sin(radians);
 	var cosine = Math.cos(radians);

  	// translate point back to origin:
  	point.x -= pivot.x;
  	point.y -= pivot.y;

  	// rotate point
  	var xnew = point.x * cosine - point.y * sine;
  	var ynew = point.x * sine + point.y * cosine;

  	// translate point back:
  	point.x = xnew + pivot.x;
  	point.y = ynew + pivot.y;

  	return point;
}

function scale_point(point, scale) {
	return new Point(point.x * scale, point.y * scale); 
}

function degrees_to_radians(degrees) {
	return 0.017453 * degrees; 
}

function radians_to_degrees(radians) {
	return 57.2958 * radians; 
}