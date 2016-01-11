function splitter(phrase){
	
	var phraseArray = phrase.split(" ");
	
	var longestWords = [];
	var shortestWords = [];
	
	longestWords[0] = phraseArray[0];
	shortestWords[0] = phraseArray[0];
	
	for (var i = 0; i < phraseArray.length; i++)
	{
		// Longest
		if (longestWords[0].length < phraseArray[i].length)
		{
			for (var j = 0; j < longestWords.length; j++)
			{
				longestWords.pop();
			}
			longestWords[0] = phraseArray[i];
		}
		else if (longestWords[0].length === phraseArray[i].length)
		{
			longestWords.push(phraseArray[i])
		}
		
		// Shortest
		if (shortestWords[0].length > phraseArray[i].length)
		{
			for (var j = 0; j < shortestWords.length; j++)
			{
				shortestWords.pop();
			}
			shortestWords[0] = phraseArray[i];
		}
		else if (shortestWords[0].length === phraseArray[i].length)
		{
			shortestWords.push(phraseArray[i])
		}
	}
	
	var distinct = [];
	
	distinct[0] = phraseArray[0];
	
	for (var i = 0; i < distinct.length; i++)
	{
		for (var j = 0; j < phraseArray.length; j++)
		{
			if (phraseArray[j] !== distinct[i])
			{
				distinct.push(phraseArray[j]);
			}
		}
	}
	
	var independentWordCount = [];
	
	for (var i = 0; i < distinct.length; i++)
	{
		independentWordCount[i] = { word:distinct[i], count:1 };
	}
	
	// Count
	for (var i = 0; i < independentWordCount.length; i++)
	{
		for (var j = 0; j < phraseArray.length; j++)
		{
			if (phraseArray[j] !== independentWordCount[i])
			{
				distinct.push(phraseArray[j]);
			}
		}
	}
	
	var objReturn = {
		totalNumber: phraseArray.length,
		longest: longestWords,
		shortest: shortestWords,
		dis: distinct.length
	};
	
	
	return objReturn;
	// longest, shortest
}



 splitter("Why is this function not working? Oh yeah I need to call it!");






























































/* LAB 3
function prime(number){
	
	if ((number % 2 === 0) && (number !== 2))
	{
		return "This number ISN'T prime";
	}
	else
	{
		for (var i = 0; i <= Math.sqrt(number); i++)
		{
			if ((number % i === 0) && (i !== 1))
			{
				return "This number ISN'T prime";
			}
		}
		return "This number IS prime";
	}
}

	//var num = prompt("Enter in a number to see if it is PRIME");
	
	//num = parseInt(num);
	
	console.log(prime(2));
	console.log(prime(12));
	console.log(prime(29));
*/	

