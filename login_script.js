// Get Firebase
var ember = new Firebase("https://jterm2016.firebaseio.com");

function login(){
	
	// Get Username
	var userName = $("#usr");
	// Get pass
	var userPass = $("#pwd");
	
	// Go ahead and clear the fields
	$("#usr").val("");
	$("#pwd").val("");
	
	// Check for account existence
	
	ember.once("value", function(snapshot) {
		var a = snapshot.exists();
		// a === true

		var b = snapshot.child("name").exists();
		// b === true

		var c = snapshot.child("name/first").exists();
		// c === true

		var d = snapshot.child("name/middle").exists();
		// d === false (because there is no "name/middle" child in the data snapshot)
		});
	// If account doesn't exist
	

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