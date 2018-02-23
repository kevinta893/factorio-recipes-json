//attempts to parse the recipes JSON file for syntax errors
var fs = require('fs');
var recipesJSON = JSON.parse(fs.readFileSync('./recipes.json', 'utf8'));			//synchronous
console.log("Total Recipes found=" + recipesJSON.length);
console.log("Testing done.");
