//converts a CSV recipe file to a JSON file
var fs = require('fs');
var csvRaw = fs.readFileSync(process.argv[2], 'utf8').trim();			//synchronous

var csvRows = csvRaw.split("\n");

var jsonList = [];
for (var i = 1 ; i < csvRows.length ; i++){		//note: skip the first as it is the header.
	var recipeItem = {};
	var rowSplit = csvRows[i].split(",");
	
	if (rowSplit.length <= 0){
		continue;
	}
	
	recipeItem.id = rowSplit[0];
	recipeItem.name = rowSplit[1];
	recipeItem.type = rowSplit[2];
	recipeItem.wiki_link = rowSplit[3];
	recipeItem.category = rowSplit[4];

	//now for the complicated recipe structure
	recipeItem.recipe = {};

	if (rowSplit.length >= 5){
		//entry is greater than 5 columns, has a recipe, otherwise leave blank
		//recipeItem.recipeType = rowSplit[5];			//the delimiter for a normal recipe list
		recipeItem.recipe.time = parseFloat(rowSplit[6]);
		recipeItem.recipe["yield"] = parseFloat(rowSplit[7]);
		
		//the rest of the row is ingredients, turn into list
		recipeItem.recipe.ingredients = [];
		for (var j = 8 ; j < rowSplit.length ; j++){
			if (rowSplit[j].split(":").length !=2){
				continue;
			}
			
			var ingredientRaw = rowSplit[j].split(":");
			var ingredientItem = {
				id: ingredientRaw[0],
				amount: parseFloat(ingredientRaw[1])
			};
			
			recipeItem.recipe.ingredients.push(ingredientItem);
		}
	}
	else{
		//recipe is empty, just filled with an empty recipe
		recipeItem.recipe = {
			time: null,
			"yield": null,
			ingredients: []
		};
	}
	
	
	//add JSON object to list
	jsonList.push(recipeItem);
}


//===============================================
// output to file

console.log("Total recipes parsed: " + jsonList.length);
writeToFile("recipes_csv_converted.json", JSON.stringify(jsonList, null, 4));



function writeToFile(filename, data){
	fs.writeFile(filename, data, "utf-8", function(err){
		if (err){
			console.log("Error writing to file: \n" + err);
			return;
		}
	});
}

