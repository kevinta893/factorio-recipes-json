//attempts to parse the recipes JSON file for syntax errors
var fs = require('fs');
var recipesJSON = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));			//synchronous
console.log("Total Recipes found=" + recipesJSON.length);





//run test cases
var recipes = {};
//Setup database in hash table
for (var i = 0 ; i < recipesJSON.length ; i++){
	var recipe = recipesJSON[i];
	recipes[recipe.id] = recipe;
}


var DEPTH_CUTOFF = 10000;			


for (var i = 0 ; i < recipesJSON.length ; i++){
	console.log("Recursing on recipe=" + recipesJSON[i].id + 
		", max_depth=" + recurseRecipe(recipesJSON[i].id));
}


//digs down on each item's recipe and see if it terminates
function recurseRecipe(recipeId){
	return recurseRecipeTree(recipeId, 0);
}


function recurseRecipeTree(recipeId, level){
	
	if (level >= DEPTH_CUTOFF){
		throw new Error("Recursion for recipe too deep! id=" + recipeId);
	}
	
	
	var recipeItem = recipes[recipeId];

    if (recipeItem.type == "raw"){
        return level;
    }
    else{
        var recipeItems = recipeItem.recipe0.items;
		var maxdepth = level;
        for (var i = 0; i < recipeItems.length ; i++) {
            var recipePart = recipeItems[i];
            //recurse per recipe part and combine results
			maxdepth = Math.max(maxdepth, recurseRecipeTree(recipePart.id, level + 1));
        }

        return maxdepth;
    }


}









console.log("Testing done.");

