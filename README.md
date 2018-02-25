# factorio-recipes-json
[![Build Status](https://travis-ci.org/kevinta893/factorio-recipes-json.svg?branch=master)](https://travis-ci.org/kevinta893/factorio-recipes-json)
[![license](https://img.shields.io/badge/license-MIT-green.svg)]()
[![factorio version](https://img.shields.io/badge/factorio%20version-0.16.25-green.svg)]()


A database of Factorio Recipes in JSON designed for HTML visualizations of the game's recipes. Recursive algorithms can be used to determine item dependancies.

Recipe Data sourced from the [Official Factorio Wiki](https://wiki.factorio.com/) and the official game's Lua recipe files. 

Current recipes supported up to Factorio Version 0.15.40. Send me pull requests if you find any inconsistencies or errors.

## How to use

The database is a JSON list of all the recipes in the game. Recipe dependancies can be searched by their IDs. It also includes some item types like Resources (e.g. Iron) and Liquids (e.g. Water) to help recursive algorithms terminate properly. See Exceptions below to find what slightly different.


In JQuery, You can fetch the JSON file from your local host:

``` javascript
$.getJSON("recipes.json", function (json, err){
    if (err != "success"){
        console.log("Error cannot load json\n" + err);
        return;
    }

    var recipesList = json;
    //TODO your code here
});
   
```

In Node.js, you can synchronously or asynchronously get the file (synchronous example below):
``` javascript
var recipesList = JSON.parse(fs.readFileSync('recipes.json', 'utf8'));			//synchronous
```


**Optimization:** I recommend turning the recipe list into a dictionary in Javascript. This will make searching the recipe list alot faster especially during recursion:

``` javascript
var recipes = {};
for (var i = 0 ; i < recipesList.length ; i++){
	var recipe = recipesList[i];
	recipes[recipe.id] = recipe;
}
```

## Exceptions

Here is a list of exceptions to take note of in the database:

* TBA
