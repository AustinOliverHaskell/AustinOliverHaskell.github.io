// Get Firebase
var ember = new Firebase("https://jterm2016.firebaseio.com");

activeUser = null;

key = null;

function login(fromSign){
	
	if (fromSign === true)
	{
		// Get Username
		var userName = $("#usr").val();
		// Get pass
		var userPass = $("#pwd").val();
		
		// Go ahead and clear the fields
		$("#usr").val("");
		$("#pwd").val("");
	}
	else
	{
		// Get Username
		var userName = $("#newUser").val();
		// Get pass
		var userPass = $("#newPassword").val();
		
		// Clear Fields
		$("#newUser").val("");
		$("#newPassword").val("");
		$("#newEmail").val("");
		
	}
	
	var user = null;
	var errorMessage = null;
	
	// Check for account existence
	ember.once("value", function(snapshot){
		
		snapshot.forEach(function(childSnapshot){
			
			var tempUser = childSnapshot.val();
			
			if(tempUser.Username === userName) // Found User
			{
				if(tempUser.Password === userPass) // Password is the same
				{
					key = childSnapshot.key() 
					console.log(key);
					user = new Object();
					user = tempUser;   
				}
				else
				{
					errorMessage = "Incorrect Password";
				}
			}
		});
		
		// Check if user was found with appropriate password match
		if (user !== null)
		{
			// Magic goes here
			$('#loginModal').modal('toggle');
			changePage(user);
			
			activeUser = new Object;
			activeUser = user;
		}
		else
		{
			if (errorMessage === null) // No user found
			{
				errorMessage = "User not found! You should sign up!";
			}
			
			$("#errorMessage").text(errorMessage);
		}
	});
	


}
function signUp() {
		// Get Username
		var userName = $("#newUser").val();
		
		// Get pass
		var userPass = $("#newPassword").val();
		
		// Get Email
		var userEmail = $("#newEmail").val();
		
		var userTaken = false;
		
		
		ember.once("value", function(snapshot){
		
		snapshot.forEach(function(childSnapshot){
			
			var tempUser = childSnapshot.val();
			
			if(tempUser.Username === userName) // Found User
			{
				userTaken = true;
			}
			
		});
		
		if (userTaken === false)
		{
			ember.push({Username: userName, Email: userEmail, Password: userPass, Designs: [0], cart: [0]});
			$("#errorMessageTwo").text("Account Created!");
			login(false);
		}
		else
		{
			$("#errorMessageTwo").text("Username Taken. Please choose another name.");
		}
		
	});
}
function changePage(currentUser) {
	
	$("#loginNav").remove();
	$("#signupNav").remove();
	
	//$("#userArea").append("<li id='dashNav'><a data-toggle ='modal' data-target='#loginModal' class = 'customFont'>DashBOaRd <span class = 'glyphicon glyphicon-dashboard'></span></a></li>");
	$("#userArea").append("<li id='cartNav'><a data-toggle ='modal' data-target='#cartModal' class = 'customFont' onclick='createPriceDisplay()'>CaRT <span class = 'glyphicon glyphicon-shopping-cart'></span></a></li>");
	$("#userArea").append("<li id='settingsNav'><a data-toggle ='modal' data-target='#settingsModal' class = 'customFont'><span class = 'glyphicon glyphicon-cog'></span></a></li>");
	
	$("#myUsername").text(currentUser.Username);
	$("#myEmail").text(currentUser.Email);
}
function addDesign(toCart) {
	
	if (activeUser === null)
	{
		needToLogin();
	}
	else
	{
		ember.once("value", function(snapshot){
			snapshot.forEach(function(childSnapshot){
				
				var tempUser = childSnapshot.val();
				
				if(tempUser.Username === activeUser.Username) // Found User that we want to update
				{
					var newOrder = getAllValues();
					
					// Put it where it needs to go
					if (toCart === true)
					{
						if ((activeUser.cart.length === 1) && (activeUser.cart[0] === 0))
						{
							activeUser.cart[0] = newOrder;
						}
						else
						{
							activeUser.cart.push(newOrder);
						}
					}
					else
					{
						if ((activeUser.Designs.length === 1) && (activeUser.Designs[0] === 0))
						{
							activeUser.Designs[0] = newOrder;
						}
						else
						{
							activeUser.Designs.push(newOrder);
						}
					}	
					
					// Update object
					ember.child(key).update(activeUser);
					
				}
				
			});
			
		});
	}
	
	
}
function needToLogin() {
	
	$('#myModal').modal('toggle'); // Turn off the main modal
	$('#loginModal').modal('toggle'); // Turn on the signup modal
	
}

