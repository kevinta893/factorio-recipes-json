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
// turns the recipe database into a csv

var headerRow = "id,name,type,wiki_link,category,time,yield,ingredients";



//convert each item into a row in csv
var csvCollection = [];
csvCollection.push(headerRow);
for (var i = 0 ; i < recipesList.length ; i++){
	var row = 
		recipesList[i].id + "," +
		recipesList[i].name + "," +
		recipesList[i].type + "," +
		recipesList[i].wiki_link + "," +
		recipesList[i].category + "," +
		recipesList[i].recipe.time + "," +
		recipesList[i].recipe["yield"];
		
	//put ingredients last
	var ingredients = recipesList[i].recipe.ingredients;
	for (var j = 0 ; j < ingredients.length ; j++){
		row += "," + ingredients[j].id  + ":" + ingredients[j].amount
	}
	
	//add row to list
	csvCollection.push(row);
}

//collect all rows into a big string and write to file
var fileData = "";
for (var i = 0 ; i < csvCollection.length ; i++){
	fileData += csvCollection[i] + "\n";
}
console.log(fileData);

writeToFile("recipes.csv", fileData);



function writeToFile(filename, data){
	fs.writeFile(filename, data, "utf-8", function(err){
		if (err){
			console.log("Error writing to file: \n" + err);
			return;
		}
	});
}

