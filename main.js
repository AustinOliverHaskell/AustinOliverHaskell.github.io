function swapShirts(color){
	
	var image = $("#displayImg");
	var shirtType = $("#chosenType");
	
	image.attr("shirtColor", color);
	
	if (shirtType.val() === "Short Sleeve")
	{
		if (color === 'white')
		{
			image.attr("src","images/blank_shirts/white.jpg");
		}
		else if ( color === 'grey')
		{
			image.attr("src","images/blank_shirts/grey.jpg");
		}
		else if (color === "black")
		{
			image.attr("src","images/blank_shirts/black.jpg");
		}
		else if (color === "red")
		{
			image.attr("src","images/blank_shirts/red.jpg");
		}
		else if (color === "yellow")
		{
			image.attr("src","images/blank_shirts/yellow.jpg");
		}
		else if (color === "orange")
		{
			image.attr("src","images/blank_shirts/orange.jpg");
		}
		else if (color === "green")
		{
			image.attr("src","images/blank_shirts/green.jpg");
		}
		else if (color === "blue")
		{
			image.attr("src","images/blank_shirts/blue.jpg");
		}
		else if (color === "aqua")
		{
			image.attr("src","images/blank_shirts/aqua.jpg");
		}
		else if (color === "purple")
		{
			image.attr("src","images/blank_shirts/purple.jpg");
		}
	}
	else if (shirtType.val() === "Long Sleeve")
	{
		if (color === 'white')
		{
			image.attr("src","images/blank_shirts/l_white.jpg");
		}
		else if ( color === 'grey')
		{
			image.attr("src","images/blank_shirts/l_grey.jpg");
		}
		else if (color === "black")
		{
			image.attr("src","images/blank_shirts/l_black.jpg");
		}
		else if (color === "red")
		{
			image.attr("src","images/blank_shirts/l_red.jpg");
		}
		else if (color === "yellow")
		{
			image.attr("src","images/blank_shirts/l_yellow.jpg");
		}
		else if (color === "orange")
		{
			image.attr("src","images/blank_shirts/l_orange.jpg");
		}
		else if (color === "green")
		{
			image.attr("src","images/blank_shirts/l_green.jpg");
		}
		else if (color === "blue")
		{
			image.attr("src","images/blank_shirts/l_blue.jpg");
		}
		else if (color === "aqua")
		{
			image.attr("src","images/blank_shirts/l_aqua.jpg");
		}
		else if (color === "purple")
		{
			image.attr("src","images/blank_shirts/l_purple.jpg");
		}
	}
	else if (shirtType.val() === "Hoodie")
	{
		
	}
	
	
	
	
	
	
	


	
	
	
	
	
	

}

function changeDesign(text) {
	
	var design = $("#chosenDesign");
	
	design.text(text);
	
	design.val(text);
	
	//console.log("IT GOT THERE");
}

function changeShirtType(type){
	
	var shirtType = $("#chosenType");
	
	shirtType.text(type);
	
	shirtType.val(type);
}

function changeSize(size) {
	
	var shirtSize = $("#chosenSize");
	
	shirtSize.text(size);
	
	shirtSize.value = size;
}

function getAllValues() {
	
	var shirtType = $("#chosenType");
	var design = $("#chosenDesign");
	var image = $("#displayImg");
	var qty = $("#Quantity");
	var size = $("#chosenSize");
	
	
	console.log("Img color: "+image.attr("shirtColor"));
	console.log("Chosen Design: "+design.val());
	console.log("Shirt Type: "+shirtType.val());
	console.log("Quantity: "+qty.val());
	console.log("Size: "+size.val());
	
}





















