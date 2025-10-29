//Mi grafo es el tablero
//Usar algortimo y uno de busqueda para ver el camino mas corot (idea: bst)
//Usae queue

console.log("hey");
function knightMoves(begin) {
    console.log(nextSteps(begin));
}

//Function that gives the next possible steps
function nextSteps(coordinates) {
    //Array that will store
    let totalMoves = [];
    //Set the values of the coordinate x and y
    let x = -1;
    let y = -2;
    //For loops that goes through the 8 possible moves of the knight
    for(let i = 1; i < 9; i++) {
        //Array that will store the coordinates of the possible square
        let individualMoves = [];
        //If i is prime change its value, every one step it will change value
        if(i % 2 != 0) {
            x *= -1;
        }
        //Change the value of y
        y *= -1;
        //Check if the coordinates are not lesser and bigger than the board (the board is 8 * 8)
        if((coordinates[0] + x > -1 && coordinates[1] + y > -1) && (coordinates[0] + x <= 7 && coordinates[1] + y <= 7)) {
            individualMoves.push(coordinates[0] + x, coordinates[1] + y);
            totalMoves.push(individualMoves);
        }
        //If i is 4 change the values of x and y
        if(i === 4){
            x = 2;
            y = 1;
        }
    }
    return totalMoves;
}

knightMoves([6,5]); 


//PLAN
//crear dinamicamente los posibles movimientos en el tablero: LISTO
//ENCONTRAR EL CAMINO DE UNA COORDENADA A OTRA (SIN CHECAR SI ES EL MAS CORTO O NO): NO