function swapShirts(newUrl, color){
	var image = $("#displayImg");
	
	image.attr("src",newUrl);
	
	image.value = color;
	
	console.log(image.value);
	
}

function changeDesign(text)
{
	var design = $("#chosenDesign");
	
	design.prop = "SNARF";
	
	console.log("IT GOT THERE");
}

