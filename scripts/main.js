"use strict"



let playerInfo = {
	"id" : "JJWQ",
	"icon" : "†"
};

const cl = (input) => {
	console.log(input);
}

const generateTable = (id) => {
	$("#board").append("<table id=\"" + id + "\"></table>");
}

const generateRows = (table, exponent) => {
	console.log("I'm generating rows!")
	for (var i = 0; i < exponent; i++) {
		findObjectById(table).append(generateElementAndId("tr", "row_" + i))
		console.log("row " , i , " generated.")
		generateTiles(findObjectById('row_' + i), i, exponent)
	}
}

const generateTiles = (rowObj, rowNum, exponent) => {
	console.log("I'm generating tiles!")
	for (let i = 0; i < exponent; i++) {
		rowObj.append(generateElementAndId("td", generateIdString("tile", rowNum, i)));
		
		// assigns border classes
		let tile = findObjectById(generateIdString("tile", rowNum, i))

		if (rowNum === 0) {
			tile[0].classList.add("northBorder");
		}

		if (i === exponent - 1) {
			tile[0].classList.add("eastBorder");
		}

		if (rowNum === exponent - 1) {
			tile[0].classList.add("southBorder");
		}

		if (i === 0) {
			tile[0].classList.add("westBorder");
		}
	}
}

// ___ PLAYER FUNCTIONS ___

const generatePlayerAtTile = (player, tile) => {
	addPlayerToTile(player, tile);
}

const getPlayerInfoByName = (player) => {
	//info
	return player;
}

// ___ FIND FUNCTIONS ___

const findTileObjectByPlayer = (player) => {
	var tile = $( "#P_" + player ).parent();
	return tile;
}

const findObjectById = (id) => {
	return $("#" + id);
}

const findElementWithinElement = (parentElement, childElement) => {
	
}

const findPlayerObjectByName = (player) => {
	var playerObject = $( "#P_" + player);
	return playerObject[0];
}

const generateNewTableIfNeeded = (direction, tableId) => {
	var x = 0, y = 0;

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
	var newTableId = findTableIdByDirection(direction, tableId);

	if (checkIfIdExists(newTableId)) {
		console.log(newTableId + " exists!")

	} else {
		generateTable(newTableId);
		console.log(newTableId + " is being created!!")
		generateRows(newTableId, 6);
	}
}

const checkForBorderCrossing = (direction, currentTile) => {
	if (currentTile.hasClass(direction + 'Border')) {
		return true;
	} else {
		return false;
	}
}

const findTileOverBorder = (direction, currentTile) => {
	var tableId = convertObjectToIdString(currentTile.closest('table'));
	var tileIdArray = splitIdStringToArray(convertObjectToIdString(currentTile));
	var row = Number(tileIdArray[1]), tile = Number(tileIdArray[2]);

	cl(tileIdArray)
}

const findTableByDirection = (direction, currentTableId) => {
	var tableIdArray = splitIdStringToArray(currentTableId));
}

const findTableIdByDirection = (direction, tableId) => {
	var tableIdArray = splitIdStringToArray(tableId);
	var x = Number(tableIdArray[1]), y = Number(tableIdArray[2]);

	if (direction === "north") {
		y = 1;
	}
		
	if (direction === "east") {
		x = 1;
	}

	if (direction === "south") {
		y = -1;
	}

	if (direction === "west") {
		x = -1;
	}

	return editIdString(tableId, x, y);
}

const findTileByDirection = (currentTile, direction) => {
	var tableId = convertObjectToIdString(currentTile.closest('table'));
	var tileIdArray = splitIdStringToArray(convertObjectToIdString(currentTile));
	var row = Number(tileIdArray[1]), tile = Number(tileIdArray[2]);

	if (checkForBorderCrossing(direction, currentTile)) {
		cl("I am crossing a border")
		generateNewTableIfNeeded(direction, tableId)
		return findTileOverBorder(direction, currentTile)
	}

	if (direction === "north") {
		row -= 1
	}

	if (direction === "east") {
		tile += 1
	}

	if (direction === "south") {
		row += 1
	}

	if (direction === "west") {
		tile -= 1;
	}

	return findObjectById(generateIdString(tileIdArray[0], row, tile))[0];
}

// ___ MOVE FUNCTIONS ___

const addPlayerToTile = (player, tile) => {
	tile.innerHTML = "<div id=\"P_" + player + "\"><p>" + getPlayerInfoByName(player) + "</p></div>";
}

const removePlayerFromTile = (player, tile) => {
	tile[0].innerHTML = playerInfo.icon;
}

const movePlayerToTile = (player, tile) => {
	removePlayerFromTile(player, findTileObjectByPlayer(player));
	addPlayerToTile(player, tile);
}

const checkForMovement = () => {
	$(document).keyup((e) => {
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
	})
}

// ___ HELPER FUNCTIONS ___


const checkIfIdExists = (id) => {
	if ($("#" + id).length) {
		return true;

	} else {
		return false;
	}
}

const generateElementAndId = (element, id) => {
	return "<" + element + " id=\"" + id + "\"></" + element + ">";
}

// ___ ID STRING FUNCTIONS ___

const convertObjectToIdString = (object) => {
	return generateIdString(object[0].id.split("_")[0], object[0].id.split("_")[1], object[0].id.split("_")[2]);
}

const splitIdStringToArray = (id) => {
	return id.split("_");
}

const editIdString = (oldId, a, b) => {
	var array = splitIdStringToArray(oldId);
	return generateIdString(array[0], (Number(array[1]) + a), (Number(array[2]) + b));
}

const generateIdString = (element, a, b) => {
	return element + "_" + a + "_" + b
}

// ___ RUN ___

$('document').ready(() => {
	generateRows("table_0_0", 7);
	generatePlayerAtTile(playerInfo.id, $("#tile_2_2")[0]); // <---- TO FIX: ISSUE WHEN MULTIPLE TABLES
	checkForMovement();
});