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


//write to file, pretty JS dump
fs.writeFile(process.argv[3], JSON.stringify(recipes, null, 4), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 