//  /$$       /$$$$$$  /$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$$   /$$$$$$  /$$$$$$$$
// | $$      |_  $$_/ /$$__  $$| $$  | $$|__  $$__/| $$__  $$ /$$__  $$|__  $$__/
// | $$        | $$  | $$  \__/| $$  | $$   | $$   | $$  \ $$| $$  \ $$   | $$   
// | $$        | $$  | $$ /$$$$| $$$$$$$$   | $$   | $$$$$$$ | $$  | $$   | $$   
// | $$        | $$  | $$|_  $$| $$__  $$   | $$   | $$__  $$| $$  | $$   | $$   
// | $$        | $$  | $$  \ $$| $$  | $$   | $$   | $$  \ $$| $$  | $$   | $$   
// | $$$$$$$$ /$$$$$$|  $$$$$$/| $$  | $$   | $$   | $$$$$$$/|  $$$$$$/   | $$   
// |________/|______/ \______/ |__/  |__/   |__/   |_______/  \______/    |__/   
                                                                              
//  /$$$$$$$  /$$     /$$
// | $$__  $$|  $$   /$$/
// | $$  \ $$ \  $$ /$$/ 
// | $$$$$$$   \  $$$$/  
// | $$__  $$   \  $$/   
// | $$  \ $$    | $$    
// | $$$$$$$/    | $$    
// |_______/     |__/                                                                                 
                                                                              
//     /$$$$$  /$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$   /$$$$$$                   
//    |__  $$ /$$__  $$ /$$__  $$| $$  | $$| $$____/  /$$__  $$                  
//       | $$| $$  \ $$| $$  \ $$| $$  | $$| $$      | $$  \__/                  
//       | $$| $$  | $$| $$  | $$| $$$$$$$$| $$$$$$$ | $$$$$$$                   
//  /$$  | $$| $$  | $$| $$  | $$|_____  $$|_____  $$| $$__  $$                  
// | $$  | $$| $$  | $$| $$  | $$      | $$ /$$  \ $$| $$  \ $$                  
// |  $$$$$$/|  $$$$$$/|  $$$$$$/      | $$|  $$$$$$/|  $$$$$$/                  
//  \______/  \______/  \______/       |__/ \______/  \______/          

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
var snake = true;

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

var adminlist = 
    ["a", //Put users in here inside quotes
     "b", 
     "joebot456"];
     
var banlist = 
    ["bettyloo", //Put users in here inside quotes
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

// add a callback handler
connection.addMessageCallback("*", function(m) {
	switch(m.type) {
			
		// Joining started
		case "init": {
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
			if (m.getInt(0) == yourUsername) {
    			
    			// If they say !help
    			if(m.getString(1) == "!help") {
    			    connection.send("say", "!download - Show the download link");
    			    connection.send("say", "!loopon - make snakes loop back instead of ending");
    			    connection.send("say", "!loopoff - make snakes end instead of looping");
    			}
    			
    			if(m.getString(1) == "!loopon") {
    				loop = true;
    			}
    			
    			if(m.getString(1) == "!loopoff") {
    				loop = false;
    			}
			}
			
			// if they said "!download"
    			if(m.getString(1) == "!download") {
    				// tell them that
    				connection.send("say", "There is no download for this bot, it runs in your browser! Check out the Everybody Edits JavaScript IDE!");
    				connection.send("say", "https://github.com/EverybodyPrograms/Lightbot");
    
    			}
		} break;
		
		// when someone places a block
    	case "b": {
    	    if (snake) {
    	    var layer = m.getInt(0);
    	    var x = m.getUInt(1);
    	    var y = m.getUInt(2);
    	    var blockid = m.getUInt(3);

    	    setTimeout(snake, snakeDelay);
    	    }
    	} break;
    	
    	// when someone touches a crown
    	case "k": {
    	    var crownid = m.getInt(0);
    	    connection.send("say", "/ge " + player[playerid]);
    	    log(username + " given edit. Reason: Collected crown");
    	} break;
    	
    	// when someone collects a trophy
    	case "ks": {
    	    if (trophytowin) {
        	    var wonid = m.getInt(0);
        	    connection.send("say", "/ge " + player[playerid]);
        	    log(username + " given edit. Reason: Collected trophy");
    	    }
    	} break;
    	
    	// The snake function
		function snake() {
		    
		    // Prepare for messy bad code: [be warned its bad] 
		    if (blockid == 9) {
    	        connection.send("b", layer, x, y, 182);
    	    }
    	    
    	    else if (blockid == 182) {
    	        if (loop) {
    	            connection.send("b", layer, x, y, 1088);
    	        }
    	        else {
    	        connection.send("b", layer, x, y, 0);}
    	    }
    	    
    	    else if (blockid == 1088) {
    	         connection.send("b", layer, x, y, 9);
    	    }
    	    
    	    else if (blockid == 12) {
    	         connection.send("b", layer, x, y, 1018);
    	    }
    	    
    	    else if (blockid == 1018) {
    	         connection.send("b", layer, x, y, 13);
    	    }
    	    
    	    else if (blockid == 13) {
    	         connection.send("b", layer, x, y, 14);
    	    }
    	    
    	    else if (blockid == 14) {
    	         connection.send("b", layer, x, y, 15);
    	    }
    	    
    	    else if (blockid == 15) {
    	         connection.send("b", layer, x, y, 10);
    	    }
    	    
    	    else if (blockid == 10) {
    	         connection.send("b", layer, x, y, 11);
    	    }
    	    
    	    else if (blockid == 11) {
    	        if (loop) {
    	            connection.send("b", layer, x, y, 1018);
    	        }
    	        else {
    	         connection.send("b", layer, x, y, 0);}
    	    }
    	    
    	    else if (blockid == 100) { 
    	         connection.send("b", layer, x, y, 101);
		    }
		    
		    else if (blockid == 101) { 
    	         connection.send("b", layer, x, y, 100);
		    }
		    
		    else if (blockid == 255) { 
    	         connection.send("b", layer, x, y, 0);
		    }
		    
		} break;
	}
});

connection.send("init");
    
