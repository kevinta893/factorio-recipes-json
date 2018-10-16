# factorio-recipes-json
[![Build Status](https://travis-ci.org/kevinta893/factorio-recipes-json.svg?branch=master)](https://travis-ci.org/kevinta893/factorio-recipes-json)
[![license](https://img.shields.io/badge/license-MIT-green.svg)]()
[![factorio version](https://img.shields.io/badge/factorio%20version-0.16.27-green.svg)]()


A database of Factorio Recipes in JSON designed for HTML visualizations of the game's recipes. Recursive algorithms can be used to determine item dependancies. Of course, this repository has automated build, test, and deployment in honour of Factorio's style. :smile:

**Please note that the database is still under development, there may be signficant changes before the complete version is released**

See the demo recipe browser [here](https://kevinta893.github.io/factorio-recipes-json).

Recipe Data sourced from the [Official Factorio Wiki](https://wiki.factorio.com/) and the official game's Lua recipe files. 
Send me pull requests if you find any inconsistencies or errors.

## How to use

The database is a JSON list of all the recipes in the game. Recipe dependancies can be searched by their IDs. It also includes some item types like Resources (e.g. Iron) and Liquids (e.g. Water) to help recursive algorithms terminate properly. See *Addtional Notes* below for more information

### 1. Import the file

You can use one of the two flavors of the database: Array or Dictionary. The Array list is the canonical used for development. The dictionary uses the id of the recipe as the key. Use one of the following links below to get the file for your project: 
* Recipes as a List:
	* [recipes.json](https://kevinta893.github.io/factorio-recipes-json/recipes.json) 
	* [recipes.min.json](https://kevinta893.github.io/factorio-recipes-json/recipes.min.json) 
* Recipes as a dictionary:
	* [recipes.dictionary.json](https://kevinta893.github.io/factorio-recipes-json/recipes.dictionary.json) 
	* [recipes.dictionary.min.json](https://kevinta893.github.io/factorio-recipes-json/recipes.dictionary.min.json) 

*CDN coming soon.*

### 2. Using the file
In **JQuery**, You can fetch the JSON file from your local host:

``` javascript
$.getJSON("https://kevinta893.github.io/factorio-recipes-json/recipes.min.json", function (json, err){
    if (err != "success"){
        console.log("Error cannot load json\n" + err);
        return;
    }

    var recipesList = json;
    //TODO your code here
});
   
```

In **Node.js**, you can synchronously or asynchronously get the file locally (synchronous example below):
``` javascript
var recipesList = JSON.parse(fs.readFileSync('recipes.json', 'utf8'));			//synchronous
```

## Data Fields

| Field       | Description          
| ----------------- |:-------------|
| id | A unique string identifying the recipe |
| name | The user friendly name |
| type | The item type of the resulting item. One of: Machine, Resource, Liquid, Intermediate product, Item, Science Pack, Combat, Process, Tool, null |
| wiki_link | A link to the [Factorio Wiki](https://wiki.factorio.com) |
| recipe | The item's recipe |
| recipe->ingredients | A list of ingredients to make the recipe, each ingredient has is an item with an **id** and **amount**. |
| recipe->time | The factorio time to produce the object (normal mode) |
| recipe->yield | The amount of the product produced |

## Addtional Notes

Here is a list of exceptions to take note of in the database:

* TBA
