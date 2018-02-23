# factorio-recipes-json
[![Build Status](https://travis-ci.org/kevinta893/factorio-recipes-json.svg?branch=master)](https://travis-ci.org/kevinta893/factorio-recipes-json)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![factorio version](https://img.shields.io/badge/factorio%20version-0.15.40-green.svg)]()


A database of Factorio Recipes in JSON designed for HTML visualizations of the game's recipes. Recursive algorithms can be used to determine item dependancies.

Recipe Data sourced from the [Official Factorio Wiki](https://wiki.factorio.com/) and the offcial game's Lua recipe files. 

Current recipes supported up to Factorio Version 0.15.40. Send me pull requests if you find any inconsistancies or errors.

## How to use
You can fetch the JSON file from your local host by using jQuery:

``` javascript
$.getJSON("./js/data/recipes.json", function (json, err){
    if (err != "success"){
        console.log("Error cannot load json\n" + err);
        return;
    }

    //TODO your code here
});
   
```
