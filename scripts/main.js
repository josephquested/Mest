var playerInfo = {
	"id" : "JJWQ"
};

function generateTable (id) {
	$("#board").append("<table id=\"" + id + "\"></table>");
}

function generateTiles (table, exponent) {
	table = $("#" + table);
	console.log("I'm gonna create tiles on " + table);

	for (var i = 0; i < exponent; i++) {
		// generates rows
		var row = table.append(generateElementAndId("tr", "row_" + i));

		for (var e = 0; e < exponent; e++) {
			//generates tiles
			$("#row_" + String(i)).append(generateElementAndId("td", generateIdString("tile", i , e)));
			var tile = findTileObjectById(generateIdString("tile", i , e));

			// assigns border classes
			console.log("assigning classed!");
			if (i === 0) {
				tile[0].classList.add("northBorder");
			}

			if (e === exponent - 1) {
				tile[0].classList.add("eastBorder");
			}

			if (i === exponent - 1) {
				tile[0].classList.add("southBorder");
			}

			if (e === 0) {
				tile[0].classList.add("westBorder");
			}
		}
	}
}

function generateElementAndId(element, id) {
	return "<" + element + " id=\"" + id + "\"></" + element + ">";
}

function generateIdString (element, a, b) {
	return element + "_" + a + "_" + b;
}

// ___ PLAYER FUNCTIONS ___

function generatePlayerAtTile(player, tile) {
	addPlayerToTile(player, tile);
}

function getPlayerInfoByName(player) {
	//info
	return player;
}

// ___ FIND FUNCTIONS ___

function findTileObjectByPlayer(player) {
	var tile = $( "#P_" + player ).parent();
	return tile;
}

function findTileObjectById (id) {
	return $("#" + id);
}

function findElementWithinElement(parentElement, childElement) {
	
}

function findPlayerObjectByName(player) {
	var playerObject = $( "#P_" + player);
	return playerObject[0];
}

function generateNewTableIfNeeded (direction, tableId) {
	var x = 0, y = 0;
	console.log("generate new table if needed!");

	if (direction == "north") {
		y = 1;
	}
		
	if (direction == "east") {
		x = 1;
	}

	if (direction == "south") {
		y = -1;
	}

	if (direction == "west") {
		x = -1;
	}

	var newId = editIdString(tableId, x, y);

	if (checkIfIdExists(newId)) {
		console.log(newId + " exists!");

	} else {
		generateTable(newId);
		generateTiles(newId, 6);
		console.log(newId + " is being created!!");
	}

	return newId;
}

function findTileByDirection(currentTile, direction) {
	var currentTable = currentTile.closest('table')[0];
	var tableId = generateIdString("table", Number(currentTable.id.split("_")[1]), Number(currentTable.id.split("_")[2]));
	var row = (Number(currentTile[0].id.split("_")[1]));
	var tile = (Number(currentTile[0].id.split("_")[2]));
	console.log("find tile");

	if (currentTile.hasClass("northBorder") || currentTile.hasClass("eastBorder") || currentTile.hasClass("southBorder") || currentTile.hasClass("westBorder")) {
		console.log("border class working!");
		var newTable = generateNewTableIfNeeded(direction, tableId);
		generateNewTableIfNeeded(direction, tableId);
		console.log($("#" + newTable)) //.children("#" + generateIdString("tile", row, tile))[0]);
		return $("#" + newTable).children("#" + generateIdString("tile", row, tile))[0];
	}

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

	console.log("I'm...I'm gonna return!");
	return $("#" + generateIdString("tile", row, tile))[0];
}

// ___ MOVE FUNCTIONS ___

function movePlayerToTile(player, tile) {
	removePlayerFromTile(player, findTileObjectByPlayer(player));
	addPlayerToTile(player, tile);
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
	    	movePlayerToTile(playerInfo.id, findTileByDirection(findTileObjectByPlayer(playerInfo.id), direction));
   		}
	});
}

function addPlayerToTile(player, tile) {
	tile.innerHTML = "<div id=\"P_" + player + "\"><p>" + getPlayerInfoByName(player) + "</p></div>";
}

function removePlayerFromTile(player, tile) {
	tile[0].innerHTML = "†";
}

// ___ HELPER FUNCTIONS ___


function checkIfIdExists (id) {
	if ($("#" + id).length) {
		return true;

	} else {
		return false;
	}
}

function splitIdToArray (id) {
	return [id.split("_")[0], Number(id.split("_")[1]), Number(id.split("_")[2])];
}

function editIdString(oldId, a, b) {
	var array = splitIdToArray(oldId);
	return array[0] + "_" + (array[1] + a) + "_" + (array[2] + b);
}


$('document').ready(function() {
	generateTiles("table_0_0", 6);
	generatePlayerAtTile(playerInfo.id, $("#tile_2_2")[0]); // <---- TO FIX: ISSUE WHEN MULTIPLE TABLES
	checkForMovement();
});