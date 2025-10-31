import {Tree} from "./BSTA.js";

function knightMoves(begin, end) {
    if ((begin[0] < 0 || begin[0] > 7) || (begin[1] < 0 || begin[1] > 7) || (end[0] < 0 || end[0] > 7) || (end[1] < 0 || end[1] > 7)) {
        return "The coordinates are wrong, remember the grid is only 8 * 8 starting at zero";
    } else if (begin[0] === end[0] && begin[1] === end[1]) {
        return begin;
    }
    let counter = 0;
    let theStopper = true;
    let theQueue = [];
    let theCorrectCor = 0;
    let theTraversal = [];

    console.log(nextSteps(begin));

    let possibleMovesArray = nextSteps(begin);
    for (let i = 0; i < possibleMovesArray.length; i++) {
        theQueue.push(possibleMovesArray[i]);
    }

    console.log(theQueue);

    let stepsTree = new Tree();
    stepsTree.buildTree(possibleMovesArray, begin);

    console.log(stepsTree.getRoot.getCoordinate);
    for(let i = 1; i < 9; i++) {
        console.log(stepsTree.getRoot[`getCor${i}`]);
    }
    console.log(stepsTree.getRoot.getCor1.getCoordinate);
    console.log(stepsTree.getRoot.getCor2.getCoordinate);

    while (theStopper ===  true) {
        let nextMove = theQueue.splice(0,1);
        let newMoves = nextSteps(nextMove[0]);

        console.log("new Moves: ", newMoves);

        let finalFound = stepsTree.insert(newMoves, end);
        if(finalFound[0]) {
            theCorrectCor = finalFound[1];
            theStopper = false;
        } else {
        }       
        counter += 1;
        if(counter === 2) {
            theStopper = false;
        } 
    }   

    if(theCorrectCor !== 0) {

        console.log("The correct coordinates: ", theCorrectCor.getCoordinate);

        theTraversal.unshift(theCorrectCor.getCoordinate);
        theCorrectCor = theCorrectCor.getFather;
        while(theCorrectCor !== null) {
            theTraversal.unshift(theCorrectCor.getCoordinate);
            theCorrectCor = theCorrectCor.getFather;
        }
    }
    return theTraversal;


    


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

console.log(knightMoves([0,0],[0,0])); 


//COSAS POR ARREGLAR:
//CHECAR CUANDO INICIO Y FINAL SEAN IGUALES: LISTO
//CHECAR QUE INICIO Y FINAL SEAN COORDENADAS VALIDAS: LISTO 
//HACER QUE EL WHILE DEL QUEUE SIGA POR MAS DE DOS VECES
//HACER QUE EL NEXT Y NEXTFATHER SE MUEVAN PARA MAS RAMAS
//CHECAR QUE NO HAYA MAS ERRORES
//COMENTAR