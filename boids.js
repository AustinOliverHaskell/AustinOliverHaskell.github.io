const max_velocity = 5;
const max_acceleration = 100;
const sight_range = 100;

const max_force = 0.5;

class Boid {
	constructor(position, velocity, acceleration, color) {
		this.position     = position;
		this.velocity     = velocity;
		this.acceleration = acceleration;
		this.rotation     = 0;
		this.color        = color;
	}

	update(screen_width, screen_height, boid_list, debug_print) {

		this.acceleration = zero_vector();

		var flockmates = this.look_for_flockmates(boid_list); 
		var cohesion_vector_of_flockmates   = this.calculate_cohesion_of_flockmates(flockmates);
		var heading_vector_of_flockmates    = this.calculate_average_heading_vector_of_flockmates(flockmates);
		var avoidance_vector_for_flockmates = this.calculate_avoidance_vector_of_flockmates(flockmates);

		if (flockmates.length != 0)
		{	
			this.acceleration = avoidance_vector_for_flockmates; 
			this.acceleration = this.acceleration.add(cohesion_vector_of_flockmates);
			this.acceleration = this.acceleration.add(heading_vector_of_flockmates);

			if (debug_print) {
				console.log("Cohesian  Vector: " + cohesion_vector_of_flockmates.x + ", " + cohesion_vector_of_flockmates.y);
				console.log("Heading   Vector: " + heading_vector_of_flockmates.x + ", " + heading_vector_of_flockmates.y);
				console.log("Avoidance Vector: " + avoidance_vector_for_flockmates.x + ", " + avoidance_vector_for_flockmates.y);
			}

			this.acceleration = this.acceleration.clamp(max_acceleration);
		}

		this.position = this.position.add(this.velocity);
		this.velocity = this.velocity.add(this.acceleration);

		this.velocity = this.velocity.clamp(max_velocity);

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

		// Rotation is just for cosmetic reasons, we dont use this for any of the simulation math. - Austin Haskell
		this.rotation = (Math.atan2((this.velocity.y), (this.velocity.x)) - Math.atan2(1, 0)) - 3.14;
	}

	look_for_flockmates(boid_list) {
		var flockmates = [];
		for (var boid of boid_list) {
			if (boid == this) {
				continue; 
			}

			if (this.position.distance_between(boid.position) < sight_range) {
				flockmates.push(boid.clone());
			}
		}
		return flockmates;
	}

	calculate_cohesion_of_flockmates(flockmates) {

		if (flockmates.length == 0) {
			return zero_vector();
		}

		var cohesion_vector = zero_vector();
		for (var boid of flockmates) {
			cohesion_vector = cohesion_vector.add(boid.position);
		}

		return cohesion_vector.divide_by_scalar(flockmates.length).subtract(this.position).subtract(this.velocity).clamp(max_force * 0.75);
	}

	calculate_average_heading_vector_of_flockmates(flockmates) {

		if (flockmates.length == 0) {
			return zero_vector();
		}

		var average_heading = zero_vector();
		for (var boid of flockmates) {
			average_heading = average_heading.add(boid.velocity);
		}

		return average_heading.divide_by_scalar(flockmates.length).set_magnitude(max_velocity).subtract(this.velocity).clamp(max_force);
	}

	calculate_avoidance_vector_of_flockmates(flockmates) {
		if (flockmates.length == 0) {
			return zero_vector();
		}

		var avoidance_vector = zero_vector(); 
		for (var boid of flockmates) {
			var distance_from_other_boid = this.position.distance_between(boid.position);
			var vector_away_from_other_boid = this.position.subtract(boid.position).divide_by_scalar(distance_from_other_boid * distance_from_other_boid);

			avoidance_vector = avoidance_vector.add(vector_away_from_other_boid);
		}

		return avoidance_vector.divide_by_scalar(flockmates.length).set_magnitude(max_velocity).subtract(this.velocity).clamp(max_force	);
	}

	draw(canvas) {
		draw_boid(canvas, this.position.x, this.position.y, this.rotation, 4, this.color);
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

	subtract(other_vector) {
		return new Vector(this.x - other_vector.x, this.y - other_vector.y);
		//return new Vector(other_vector.x - this.x, other_vector.y - this.y);
	}

	multiply_by_scalar(scalar) {
		return new Vector(this.x * scalar, this.y * scalar);
	}

	divide_by_scalar(scalar) {
		return new Vector(this.x / scalar, this.y / scalar);
	}

	inverse() {
		return new Vector( 1 / this.x, 1 / this.y);
	}

	square() {
		return new Vector( this.x * this.x, this.y * this.y);
	}

	distance_between(other_point) {
		return Math.sqrt(Math.pow(other_point.x - this.x, 2) + Math.pow(other_point.y - this.y, 2));
	}

	rotate(angle) {
		return new Vector(Math.abs(Math.cos(angle * this.x) - Math.sin(angle * this.y)), Math.abs(Math.sin(angle * this.x) + Math.cos(angle * this.y)));
	}

	set_magnitude(new_magnitude) {
		var old_magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
		return new Vector(this.x * (new_magnitude / old_magnitude), this.y * (new_magnitude / old_magnitude));
	} 

	clone() {
		return new Vector(this.x, this.y);
	}

	clamp(max) {
		var copy = this.clone();

		if (copy.x > max) {
			copy.x = max;
		} else if (copy.x < -max) {
			copy.x = -max;
		}

		if (copy.y > max) {
			copy.y = max;
		} else if (copy.y < -max) {
			copy.y = -max;
		}

		return copy;
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

	var boid_raw_points = [
		new Point(0.5, 0.0), /* Front Tip */
		new Point(0.0, 1.0), /* Lower Left Point*/
		new Point(0.5, 0.8), /* Middle Point*/
		new Point(0.5, 0.0), /* Middle Line */
		new Point(0.5, 0.8), /* Going Back to Middle Point */
		new Point(0.5, 1.0), /* Middle line extended past midpoint */
		new Point(0.5, 0.8), /* Going Back to Middle Point */
		new Point(1.0, 1.0)  /* Lower Right Point*/
	];

	var center_point = scale_point(new Point(0.5, 0.5), scale); 

	for (var point of boid_raw_points) {
		boid_points.push(rotate_point(scale_point(point, scale), center_point, rotation))
	}

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