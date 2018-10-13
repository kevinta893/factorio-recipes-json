//attempts to parse the recipes JSON file for syntax errors
var fs = require('fs');
var recipesList = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));			//synchronous
console.log("Total Recipes found=" + recipesList.length);





//run test cases
var recipes = {};
//Setup database in hash table
for (var i = 0 ; i < recipesList.length ; i++){
	var recipe = recipesList[i];
	recipes[recipe.id] = recipe;
}



//===============================================
//TODO your code here

//adds a new field for all items
var newList = addNewEmptyProperty("category");
dumpConsoleLogPretty(newList);
writeJsonToFile("recipes_new.json", JSON.stringify(newList, null, 4));



//Adds a new property to all recipes at the top level
function addNewEmptyProperty(propertyName){
	var ret = [];
	for (var i = 0 ; i < recipesList.length ; i++){
		ret.push(recipesList[i]);
		ret[i][propertyName] = "" + propertyName + "_TODO";
	}
	
	return ret;
}


function writeToFile(filename, data){
	fs.writeFile(filename, data, "utf-8", function(err){
		if (err){
			console.log("Error writing to file: \n" + err);
			return;
		}
	});
}

function dumpConsoleLogPretty(jsonObject){
	console.log(JSON.stringify(jsonObject,null,2));
}
