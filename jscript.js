function tester()
{
  alert( "hi");
}

// gets each square element and checks for a mouse over, and then passes the id to the function. Not working so hot.
//document.getElementById('box1').addEventListener("onmouseover", function(){ boxHighlight("box1"); },  false);
//document.getElementById('box2').addEventListener("onmouseover", function(){ boxHighlight("box2"); },  false);
//document.getElementById('box3').addEventListener("onmouseover", function(){ boxHighlight("box3"); },  false);
//document.getElementById('box4').addEventListener("onmouseover", function(){ boxHighlight("box4"); },  false);
//document.getElementById('box5').addEventListener("onmouseover", function(){ boxHighlight("box5"); },  false);
//document.getElementById('box6').addEventListener("onmouseover", function(){ boxHighlight("box6"); },  false);
//document.getElementById('box6').addEventListener("onmouseover", function(){ boxHighlight("box6"); },  false);


// checks for a mouse click for each square element, and then passes the id to the function
document.getElementById('box1').addEventListener("click", function(){ expandContent("box1", "hidden1"); },  false);
document.getElementById('box2').addEventListener("click", function(){ expandContent("box2", "hidden2"); },  false);
document.getElementById('box3').addEventListener("click", function(){ expandContent("box3", "hidden3"); },  false);
document.getElementById('box4').addEventListener("click", function(){ expandContent("box4", "hidden4"); },  false);
document.getElementById('box5').addEventListener("click", function(){ expandContent("box5", "hidden5"); },  false);
document.getElementById('box6').addEventListener("click", function(){ expandContent("box6", "hidden6"); },  false);
document.getElementById('box7').addEventListener("click", function(){ expandContent("box7", "hidden7"); },  false);

function expandContent(clickedItem, hiddenContent) {
	console.log(clickedItem);
	var clickMe = document.getElementById(clickedItem);
	clickMe.style.width = "46%";
	setTimeout( function() {document.getElementById(hiddenContent).style.display='block';}, 500); //reveals the hidden content in each box; a timeout for this one
	resetWidth(clickedItem);
	};

function resetWidth (clickedItem){
	for (i=1; i <8; i++) {
		var boxNumber = "box"+i.toString();
		console.log("Clicked box is:", i, clickedItem);
		if (boxNumber != clickedItem) { //makes sure that all are reset except for current item
			console.log("resetting box:", i, boxNumber);
			document.getElementById(boxNumber).style.width = "22%";
			document.getElementById("hidden"+i.toString()).style.display='none';
		};
	};
};
// highlights the text on mouseover. not working so well, and does not look that great anyway. 
//function boxHighlight (box) { 
//	if(document.getElementById(box).style.color == "white") { 	
//		document.getElementById(box).style.color = "gray";
//	} else {
//		document.getElementById(box).style.color = "white";
//	};
//};


//<========================== Code for terrible text adventure game =======================================>





var damage = function(min, max) { // returns a random number between max and min
    return Math.floor(Math.random() * Math.abs(max - min) + min) 
};

if (!Array.prototype.remove) { //funky bit of code that lets you remove items from an array using .remove
  Array.prototype.remove = function(val) {
    var i = this.indexOf(val);
         return i>-1 ? this.splice(i, 1) : [];
  };
};


var dungeonQuest = function() {   
//Initializing variables
    var health = 10; 
    var hit = 0
    var hp = 0
    var notDead = true;
    var input = "";
    var items = ["broadsword"];
    var itemChosen = ""
    var user = ""
// Start of the adventure
    alert("You enter a cavernous dungeon...");
    while (notDead && health > 0) { //as long as health is above zero, you are not dead
        user = prompt("You continue on your quest. Which way would you like to go?","left, right, back, forward").toLowerCase();
        if ((user != "back") && (user === "left" || user === "right" || user === "forward")) {
            user = String(Math.floor(Math.random()*3 + 1)); // randomly assigns an action for each direction you choose
        };
        switch(user) {
            case "1":
                input = prompt("You encounter a treasure chest. Would you like to open it?");
                if ((input === "y" || input === "yes") && (2 === Math.floor(Math.random()*2 + 1))) { // randomly picks between two outcomes
                    hit = damage(1,5);
                    alert("It was booby-trapped! the chest projectile vomits gold coins at you, dealing " + hit + " damage.");
                    health -= hit
                    if (health <= 0) {
                        notDead = false
                        break;
                    };      
                    alert("After licking your wounds, you pick up a pile of gold coins.");
                    items.push("gold coins")
                } else if (input === "y" || input === "yes") {
                    alert("You found the Scepter of Annihilation!");
                    items.push("scepter of annihilation");
                } else {
                    alert("You pass the chest, giving it a wide berth.");
                };
                break;
            case "2":
                itemChosen = prompt("You bump into an irascible looking troll. He looks ready to attack, but trolls are notoriously easy to bribe. What item would you like to use?", items).toLowerCase();
                switch (itemChosen) {
                    case "gold coins":
                        alert("You give the coins to the troll, and after carefully counting them ambles off.");
                        items.remove("gold coins");
                        break;
                    case "scepter of annihilation":
                        alert("You strike the troll with the Scepter of Annihilation. The scepter immediately implodes, along with the unfortunate troll.");
                        items.remove("scepter of annihilation");
                        break;
                    case "broadsword":
                        hp = 10
                        while (hp > 0) { // Attack series that repeats until user or troll hp is zero
                            hit = damage(0, 5)
                            if (hit === 0) {
                                alert("The troll swings at you, and misses.");
                            } else {
                                alert("The troll slashes you for " + hit + " damage!");
                                health -= hit
                            };
                            if (health <= 0) {
                                notDead = false
                                alert("You have been slain by the troll.");
                                break;
                            };
                            hit = damage(0, 10)
                            if (hit === 0) {
                                alert("You swing at the troll, and miss.");
                            } else {
                                alert("You swing at the troll, and cause " + hit + " damage!")
                                hp -= hit  
                            };
                        };
                        if (!notDead) {
                            break;
                        };
                        alert("You have defeated the troll!");
                        break;
                break;
            case "3":
                alert("You walk in that general direction, and find nothing of interest.");
                break;
            case "back":
                alert("Get back here, you coward!");
                break;
            default:
                alert("That is not a valid direction.");
            };
            
        };
    };
    alert("You die. How tragic!");
};

document.getElementById("myButton").onclick = dungeonQuest;

