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
	else if (shirtType.val() === "VNeck")
	{
			if (color === 'white')
		{
			image.attr("src","images/blank_shirts/v_white.jpg");
		}
		else if ( color === 'grey')
		{
			image.attr("src","images/blank_shirts/v_grey.jpg");
		}
		else if (color === "black")
		{
			image.attr("src","images/blank_shirts/v_black.jpg");
		}
		else if (color === "red")
		{
			image.attr("src","images/blank_shirts/v_red.jpg");
		}
		else if (color === "yellow")
		{
			image.attr("src","images/blank_shirts/v_yellow.jpg");
		}
		else if (color === "orange")
		{
			image.attr("src","images/blank_shirts/v_orange.jpg");
		}
		else if (color === "green")
		{
			image.attr("src","images/blank_shirts/v_green.jpg");
		}
		else if (color === "blue")
		{
			image.attr("src","images/blank_shirts/v_blue.jpg");
		}
		else if (color === "aqua")
		{
			image.attr("src","images/blank_shirts/v_aqua.jpg");
		}
		else if (color === "purple")
		{
			image.attr("src","images/blank_shirts/v_purple.jpg");
		}
	}
	else if (shirtType.val() === "Hoodie")
	{
			if (color === 'white')
		{
			image.attr("src","images/blank_shirts/h_white.jpg");
		}
		else if ( color === 'grey')
		{
			image.attr("src","images/blank_shirts/h_grey.jpg");
		}
		else if (color === "black")
		{
			image.attr("src","images/blank_shirts/h_black.jpg");
		}
		else if (color === "red")
		{
			image.attr("src","images/blank_shirts/h_red.jpg");
		}
		else if (color === "yellow")
		{
			image.attr("src","images/blank_shirts/h_yellow.jpg");
		}
		else if (color === "orange")
		{
			image.attr("src","images/blank_shirts/h_orange.jpg");
		}
		else if (color === "green")
		{
			image.attr("src","images/blank_shirts/h_green.jpg");
		}
		else if (color === "blue")
		{
			image.attr("src","images/blank_shirts/h_blue.jpg");
		}
		else if (color === "aqua")
		{
			image.attr("src","images/blank_shirts/h_aqua.jpg");
		}
		else if (color === "purple")
		{
			image.attr("src","images/blank_shirts/h_purple.jpg");
		}
	}
	
	
	
	
	
	
	


	
	
	
	
	
	

}
function changeDesign(text) {
	
	var design = $("#chosenDesign");
	var img = $("#designImg");
	
	design.text(text);
	
	design.val(text);
	
	if(text === "Pinsirs")
	{
		img.attr("src","images/Designs/test390x390.png");
	}
	else if (text === "Twitter")
	{
		img.attr("src","images/Designs/twitter.png");
	}
	else if (text === "Playstation")
	{
		img.attr("src","images/Designs/playstation.png");
	}
	else if (text === "Magikarp")
	{
		img.attr("src","images/Designs/magikarp.png");
	}
	else if (text === "Github")
	{
		img.attr("src","images/Designs/github.png");
	}
	else if (text === "Drive")
	{
		img.attr("src","images/Designs/drive.png");
	}
	else if (text === "Trek")
	{
		img.attr("src","images/Designs/trek.png");
	}
	
	
	//console.log("IT GOT THERE");
}
function changeShirtType(type){
	
	var shirtType = $("#chosenType");
	
	shirtType.text(type);
	
	shirtType.val(type);
	
	changeDesignSize();
	
	var image = $("#displayImg").attr("shirtColor");
	
	swapShirts(image);
	updatePricing();
}
function changeSize(size) {
	
	var shirtSize = $("#chosenSize");
	
	shirtSize.text(size);
	
	shirtSize.value = size;
}
function getAllValues() {
	
	var tempShirtType = $("#chosenType").val();
	var tempDesign = $("#chosenDesign").val();
	var tempColor = $("#displayImg").attr("shirtColor");
	var tempQty = $("#Quantity").val();
	var tempSize = $("#chosenSize").val();
	var tempTotalPrice = $("#total").val();
	
	/*
	console.log("Img color: "+color.attr("shirtColor"));
	console.log("Chosen Design: "+design.val());
	console.log("Shirt Type: "+shirtType.val());
	console.log("Quantity: "+qty.val());
	console.log("Size: "+size.val());
	console.log("Price for Order: "+totalPrice.val());
	*/
	
	var order = {
		Type: tempShirtType,
		Design: tempDesign,
		Color: tempColor,
		Qty: tempQty,
		Size: tempSize,
		Price: tempTotalPrice
	};
	
	return order;
	
}
function changeDesignSize() {
	
	var design = $("#designImg");
	var type = $("#chosenType");
	
	if (type.val() === "Short Sleeve")
	{
		design.css("top","10%");
		design.css("left", "25%");
		design.css("width", "48%");
	}
	else if (type.val() === "Long Sleeve")
	{
		design.css("top","14%");
		design.css("left", "31%");
		design.css("width", "39%");
	}
	else if (type.val() === "VNeck")
	{
		design.css("top","19%");
		design.css("left", "27%");
		design.css("width", "45%");
	}
	else if (type.val() === "Hoodie")
	{
		design.css("top","20%");
		design.css("left", "28%");
		design.css("width", "46%");
	}
}
function updatePricing() {
	
	// Get needed data
	var shirtType = $("#chosenType");
	var qty = $("#Quantity");
	
	// Get feilds
	var price = $("#price");
	var count = $("#qCount");
	var total = $("#total");
	
	if (shirtType.val() === "Long Sleeve")
	{
		count.text(qty.val());
		price.text("15.00");
		total.text("$"+qty.val()*15);
	}
	else if (shirtType.val() === "Short Sleeve")
	{
		count.text(qty.val());
		price.text("12.00");
		total.text("$"+qty.val()*12);
	}
	else if (shirtType.val() === "Hoodie")
	{
		count.text(qty.val());
		price.text("22.00");
		total.text("$"+qty.val()*22);
	}
	else if (shirtType.val() === "VNeck")
	{
		count.text(qty.val());
		price.text("14.00");
		total.text("$"+qty.val()*14);
	}
	
}



















