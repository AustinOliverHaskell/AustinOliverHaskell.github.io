// Get Firebase
var ember = new Firebase("https://jterm2016.firebaseio.com");

function login(){
	
	// Get Username
	var userName = $("#usr");
	
	// Get pass
	var userPass = $("#pwd");
	
	// Get Firebase
	var ember = new Firebase("https://jterm2016.firebaseio.com");
	
}

function signUp()
{
		// Get Username
		var userName = $("#newUser").val();
		
		// Get pass
		var userPass = $("#newPassword").val();
		
		// Get Email
		var userEmail = $("#newEmail").val();
		
		ember.push({Username: userName, Email: userEmail, Password: userPass, Designs: 0});
		
		// Clear Fields
		$("#newUser").val("");
		$("#newPassword").val("");
		$("#newEmail").val("");
}