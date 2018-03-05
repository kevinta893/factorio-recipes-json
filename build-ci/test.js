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


var DEPTH_CUTOFF = 1000;			


for (var i = 0 ; i < recipesList.length ; i++){
	console.log("Recursing on recipe=" + recipesList[i].id + 
		", max_depth=" + recurseRecipe(recipesList[i].id));
}


//digs down on each item's recipe and see if it terminates
function recurseRecipe(recipeId){
	return recurseRecipeTree(recipeId, 0, []);
}


function recurseRecipeTree(recipeId, level, traceList){
	traceList.push("l" + level + ":" + recipeId);
	if (level >= DEPTH_CUTOFF){
		throw new Error("Recursion for recipe too deep! id=" + recipeId + "traceList=\n" + traceList);
	}
	
	
	var recipeItem = recipes[recipeId];
	
	
	
	//determine recursion
    if (recipeItem.recipe.ingredients.length <=0 ){
        return level;
    }
    else{
        var recipeItems = recipeItem.recipe.ingredients;
		var maxdepth = level;
        for (var i = 0; i < recipeItems.length ; i++) {
            var recipePart = recipeItems[i];
			
			//check if various properties should be numbers
			if (! ( typeof recipePart.amount == "number")){
				throw new Error("Ingredient amount is not a number! id=" + recipeId);
			}
			
            //recurse per recipe part and combine results
			maxdepth = Math.max(maxdepth, recurseRecipeTree(recipePart.id, level + 1, traceList));
			
        }

        return maxdepth;
    }


}



console.log("Testing done.");



//dump out stats
var itemList = Object.keys(recipes);
console.log("Total recipes=" + Object.keys(recipes).length);
var recipeCounts = {};

for (var i = 0 ; i < itemList.length ; i++){
	
	var recipeLength = recipes[itemList[i]].recipe.ingredients.length;
	
	if (!('c' + recipeLength in recipeCounts)){
		recipeCounts['c' + recipeLength] = [];
	}
	
	recipeCounts['c' + recipeLength].push(itemList[i]);

}


console.log("Recipe Ingredient Counts=");
var keyList = Object.keys(recipeCounts);
keyList = keyList.sort();
for (var i = 0 ; i < keyList.length; i++){
	console.log(keyList[i] + "\n" + JSON.stringify(recipeCounts[keyList[i]], null, 4));
}




console.log("Testing script done.");


