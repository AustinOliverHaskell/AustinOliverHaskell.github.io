function calculation(principal, monthlyRate, numberOfMonths){
	
	var retVal;
	
	retVal = (monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfMonths))) * principal;
	
	return retVal;
	
	
	/*
	                                monthly interest rate 
monthly payment = ------------------------------------------------- * principal
                  1 - (1 + monthly interest rate)^-number of months
	*/
}
function convertToMonths(yearCount){
	
	var retVal = yearCount * 12;
	return retVal;
	
}
function convertToDecimal(percent){
	return ((percent/12)/100);
}
function generateTable(principal, monthlyRate, numberOfMonths){
	
	var pageTable = document.querySelector("#table"); // Get the table div
	var plan = []; // Array for future storage of the months
	
	// Start things off
	var pumpPrime = {
		monthNum: 1,
		amount: calculation(principal, monthlyRate, numberOfMonths),
		principalPaid: 0, 
		intrestPaid: 0,
		total: 0
	};
	
	pumpPrime.principalPaid = pumpPrime.amount - monthlyRate*pumpPrime.amount;
	pumpPrime.intrestPaid = pumpPrime.amount - pumpPrime.principalPaid;
	
	plan.push(pumpPrime);
	
	// Get objects and fill array
	for (var i = 1; i < numberOfMonths; i++)
	{
		var temp = {
			monthNum: i+1,
			amount: calculation(principal, monthlyRate, numberOfMonths),
			principalPaid: 0, 
			intrestPaid: 0,
			total: 0
		};
		
		temp.principalPaid = temp.amount - monthlyRate*temp.amount;
		temp.intrestPaid = temp.amount - temp.principalPaid;
		
		plan.push(temp);
	}
	
	// Figure out the total paid
	var totalToPay = calculation(principal, monthlyRate, numberOfMonths) * numberOfMonths;
	plan[0].total = totalToPay;
	
	// Fill in the total values for all objects
	for(var i = 1; i < plan.length; i++)
	{
		plan[i].total = plan[i-1].total - plan[i].amount;
	}
	
	for (var i = 0; i < plan.length; i++)
	{
		$(pageTable).append("<tr>");
		$(pageTable).append("<td>"+ plan[i].monthNum + "</td>");
		$(pageTable).append("<td>"+ plan[i].amount + "</td>");
		$(pageTable).append("<td>"+ plan[i].principalPaid + "</td>");
		$(pageTable).append("<td>"+ plan[i].intrestPaid + "</td>");
		$(pageTable).append("<td>"+ plan[i].total + "</td>");
		$(pageTable).append("</tr>");
	}
	
	
}
function mainFunc(event){
	var rate = document.querySelector("#Rate");
	var prince = document.querySelector("#Principle");
	//var years = document.querySelector("#Radial").selectedIndex;
	
	rate = rate.value;
	prince = prince.value;
	
	generateTable(prince, convertToDecimal(rate), convertToMonths(15));

}


var submit = document.querySelector("#submitButton");

submitButton.addEventListener("click", mainFunc, false);















