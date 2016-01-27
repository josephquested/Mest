function generateTiles (exponent) {
	var table = $("#table");

	for (var i = 0; i < exponent; i++) {
		table.append("<tr id=\"row-" + String(i) + "\"> " + " </tr>");

		for (var e = 0; e < exponent; e++) {
			$("#row-" + String(i)).append("<td id=\"tile-" + String(i) + "-" + String(e) + "\">" + "†</td");
		}
	}
}

function generatePlayerAtTile(player, tile) {
	tile[0].classList.add("hasPlayer");
	addPlayerToTile(player, tile[0]);
	findPlayerObjectByName(player).innerHTML = player;
}

function getPlayerInfoByName(player) {
	return player;
}

function addPlayerToTile(player, tile) {
	tile.innerHTML = "<div id=\"P-" + player + "\">" + getPlayerInfoByName(player) + "</div>";
}

function removePlayerFromTile(player, tile) {
	tile[0].innerHTML = "†";
	console.log(tile);
}

function findTileByPlayer(player) {
	var tile = $( "#P-" + player ).parent();
	return tile;
}

function findPlayerObjectByName(player) {
	var playerObject = $( "#P-" + player);
	return playerObject[0];
}

function movePlayerToTile(player, tile) {
removePlayerFromTile(player, findTileByPlayer(player));
addPlayerToTile(player, tile);
}

function findTileByDirection(currentTile, direction) {
	var row = (Number(currentTile[0].id.split("-")[1]));
	var tile = (Number(currentTile[0].id.split("-")[2]));

	if (direction == "north") {
		row -= 1;
	}

	if (direction == "east") {
		tile += 1;
	}

	if (direction == "south") {
		row += 1;
	}

	if (direction == "west") {
		tile -= 1;
	}

	return $("#tile-" + row + "-" + tile)[0];
}

function checkForMovement() {
	$(document).keyup(function(e){
		var direction; 

    	if (e.which == 38) {
     	direction = "north";
    	}

    	if (e.which == 39) {
     	direction = "east";
    	}

    	if (e.which == 40) {
     	direction = "south";
    	}

    	if (e.which == 37) {
     	direction = "west";
    	}

   		if (direction != undefined) {
	    	movePlayerToTile("JJWQ", findTileByDirection(findTileByPlayer("JJWQ"), direction));
   		}
	});
}

$('document').ready(function() {
	generateTiles(5);
	generatePlayerAtTile("JJWQ", $("#tile-2-2"));
	checkForMovement();
});