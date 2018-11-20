var url;
var baseURL;
var query;
var pokemonData = [];
var sprite;

var input;
var inputButton;
var spriteImage;
var types = "";


function setup() {
    createCanvas(600, 500);
    background(255);

    baseURL = "https://pokeapi.co/api/v2/pokemon/";

    input = createInput("Piplup"); //example pokemon name
    input.position(50, 100);
    input.style('width', '150px');

    inputButton = createButton("Search");
    inputButton.position(220,100);

    spriteImage = createImg("");
    spriteImage.position(50, 200);


}

function draw() {
    background(255);

    text("Enter Pokemon name or a number from 1-802", 50, 80);
    inputButton.mousePressed(getData);

    if (pokemonData.length !== 0) {
        renderData();
    }

}

function getData(){
    pokemonData = [];
    types = "";

	var pokemonQuery = input.value().toLowerCase();
    query = pokemonQuery + "/";

	url = baseURL + query;
	input.value(""); //clear out text input

    data = loadJSON(url, gotPokemon);

}

function gotPokemon(data) {
    pokemonData.push(data.name);
    pokemonData.push(data.types);
    pokemonData.push(str( (int(data.height)/3.048).toFixed(2)) ); // convert to feet
    pokemonData.push(str( (int(data.weight)/4.536).toFixed(2)) ); // convert to pounds

    sprite = data.sprites.front_default;

    for (var t=0; t < pokemonData[1].length; t++) { // in case there is more than one type
        types += pokemonData[1][t].type.name + " + ";
    }

    types = types.substring(0, types.length-2); // removes the extra plus sign and space at end of types string
}

function renderData() {
    spriteImage.remove(); // changing img src using spriteImage.src didn't work so I remove and create a new img element instead
    spriteImage = createImg(sprite);
    spriteImage.position(50, 180);

    text("Name: " + pokemonData[0], 180, 200);
    text("Type: " + types, 180, 220);
    text("Height: " + pokemonData[2] + " feet", 180, 240);
    text("Weight: " + pokemonData[3] + " pounds", 180, 260);
}