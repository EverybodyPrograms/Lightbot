
// A small general purpose bot in Javascript
// Open source: https://github.com/EverybodyPrograms/Lightbot
// Thanks to Ninjasupeatsninja / SirJosh3917 for EEJSIDE: 
//        https://sirjosh3917.github.io/EEJSIDE/

// Send me requests / bug reports for the bot:
//      Discord: joo#2111
//      Github: j0w0 (Add an issue to the repo)

// How to use the bot:
//      1: Get lightbot.html from the repository
//      2: Open it in a text editor, and scroll down to toggles in the file
//      3: Edit the toggles to your liking (and maybe edit some other stuff)
//      4: Put in username, password and world ID
//      (Preferrably use your own account on your own world)


//  _______ ____   _____  _____ _      ______  _____ 
// |__   __/ __ \ / ____|/ ____| |    |  ____|/ ____|
//    | | | |  | | |  __| |  __| |    | |__  | (___  
//    | | | |  | | | |_ | | |_ | |    |  __|  \___ \ 
//    | | | |__| | |__| | |__| | |____| |____ ____) |
//    |_|  \____/ \_____|\_____|______|______|_____/ 

// Input your username here so you can use commands
var yourUsername = "joo456";


// Change false to true to turn on snake
// Warning: snake can be laggy depending on your PC and connection
var snakeON = true;

// Change false to true to turn on crown to fun
// You must be the owner of the world to use this
// A bit buggy, turn off if it isnt working well.
var crowntowin = false;

// Change false to true to turn on trophy to win
// You must be the owner of the world to use this
var trophytowin = false;

// Change false to true to turn on admins
// You must be the owner of the world to use this
var admins = true;

// Change false to true to turn on bans
// You must use the owner of the world to use this
var bans = true;

// Change false to true to turn on friends get edits
// You must use the owner of the world to use this
var friendsgetedit = true;

// Change false to true to turn on welcomes
var welcomes = true;

// Change false to true to turn on goodbyes
var goodbyes = true;

// Change false to true to turn on death commands
var deathCommands = true;

var adminlist = 
	["a", //Put users in here inside quotes
	 "x", 
	 "x"];
	 
var banlist = 
	["x", //Put users in here inside quotes
	 "y",
	 "z"];
	 
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////  THE CODE  ////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

var snakeDelay = 10;
var loop;
var i;
var player = [];
var layer;
var x;
var y;
var blockid;

// The snake function
function snake() {
	
	switch (blockid) {
	    
	    case 1088: { // White
            connection.send("b", layer, x, y, 9);
        } break;
            
        case 9: { // Grey
            connection.send("b", layer, x, y, 182);
        } break;
            
        case 182: { // Black
            if (loop) {                         // White
			    connection.send("b", layer, x, y, 1088);
			}
			else {                            // Nothing
			    connection.send("b", layer, x, y, 0);
			}
        } break;
        
        case 12: { // Red                   // Orange
            connection.send("b", layer, x, y, 1018);
        } break;

        case 1018: { // Orange           // Yellow
            connection.send("b", layer, x, y, 13);
        } break;
                
        case 13: { // Yellow           // Green
            connection.send("b", layer, x, y, 14);
        } break;
                
        case 14: { // Green           // Cyan
            connection.send("b", layer, x, y, 15);
        } break;
                
        case 15: { // Cyan           // Blue
            connection.send("b", layer, x, y, 10);
        } break;
                
        case 10: { // Orange           // Yellow
            connection.send("b", layer, x, y, 11);
        } break;
    }
} 


// add a callback handler
connection.addMessageCallback("*", function(m) {
	switch(m.type) {
	    
		// Joining started
		case "init": {
			log(getCookie("username"));
			owner = m.getString(0);
			isOwner = m.getBoolean(15);
			
			// send "init2"
			
			if (yourUsername != "x") {
				connection.send("init2"); 
			}
			else {
				log("===================================");
				log("Please input your username!!!");
				log("Open the html file in a text editor and scroll down to toggles.");
				log("===================================");
			}
		} break;
		
		// Joining finished
		case "init2": {
			connection.send("say", "[Lightbot by joo456] Joined!");
			connection.send("say", "[Lightbot by joo456] Being controlled by: " + yourUsername);
		} break;
		
		// on a player joining:
		case "add": {
			playerid = m.getInt(0);
			username = m.getString(1);
			isFriend = m.getBoolean(12);
			
			if (username == yourUsername) {
				var yourID = playerid;
			}
			player[playerid] = username;
			
			if (welcomes) {
				connection.send("say", "Hi " + username);
			}
			
			if (admins) {
				for (i = 0; i < adminlist.length; i++) {
					if (adminlist[i] == username) {
						connection.send("say","/ge " + username);
						log(username + " given edit. Reason: is admin");
					}
				}
			}
			
			if (friendsgetedit && isFriend) {
					connection.send("say","/ge " + username);
					log(username + " given edit. Reason: is friend");
			}
			
			if (bans) {        
				for (i = 0; i < banlist.length; i++) {
					if (banlist[i] == username) {
						connection.send("say","/kick " + username+ " You're on the ban list");
						log(username + " kicked. Reason: on ban list");
					}
				}
			}
			
		} break;
		
		// when someone leaves
		case "left": {
			if (goodbyes) {
				connection.send("say", "Bye " + username);
			}
		} break;
		
		// when someone says something
		case "say": {
			var playerid = m.getInt(0);	
			var input = m.getString(1);
		//	if (m.getInt(0) == yourUsername) {
				
				// If they say !help
				if(input == "!help") {
					connection.send("pm",playerid, "!download - Show the download link");
					connection.send("pm",playerid, "!loopon - make snakes loop back instead of ending");
					connection.send("pm",playerid, "!loopoff - make snakes end instead of looping");
					connection.send("pm",playerid, "!oof - Kills you");
					connection.send("pm",playerid, "!OOF - Resets you");
					
				}
				
				if(input == "!loopon") {
					loop = true;
				}
				
				if(input == "!loopoff") {
					loop = false;
				}

				if (deathCommands) {
					if(input == "!oof") {
						connection.send("say", "/kill " + player[playerid]);
						log(player[playerid] + " killed");
					}
					if(input == "!OOF") {
						connection.send("say", "/reset " + player[playerid]);
						log(player[playerid] + " reset");
					}
				}
		//	}
			
			// if they said "!download"
				if(m.getString(1) == "!download") {
					// tell them that
					connection.send("say", "There is no download for this bot, it runs in your browser! Check out the Everybody Edits JavaScript IDE!");
					connection.send("say", "https://github.com/EverybodyPrograms/Lightbot");
	
				}
		} break;
		
		// when someone places a block
		case "b": {
			if (snakeON) {
			layer = m.getInt(0);
			x = m.getUInt(1);
			y = m.getUInt(2);
			blockid = m.getUInt(3);

			setTimeout(snake, snakeDelay);
			}
		} break;
		
		// when someone touches a crown
		case "k": {
			if (crowntowin) {
				var crownid = m.getInt(0);
				connection.send("say", "/ge " + player[crownid]);
			}
		} break;
		
		// when someone collects a trophy
		case "ks": {
			if (trophytowin) {
				var wonid = m.getInt(0);
				connection.send("say", "/ge " + player[wonid]);
			}
		} break;
		
		
		
		
	}});

connection.send("init");

