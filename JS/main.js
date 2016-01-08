function prime(number){
	
	if ((number % 2 === 0) && (number !== 2))
	{
		return "This number ISN'T prime";
	}
	else
	{
		for (var i = 0; i <= Math.sqrt(number); i++)
		{
			if (number % i == 0)
			{
				return "This number ISN'T prime";
			}
		}
		else
		{
			return "This number IS prime";
		}
	}
}

	var num = prompt("Enter in a number to see if it is PRIME");
	
	console.log(prime(num));

