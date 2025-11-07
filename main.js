import {Tree} from "./BSTA.js";

//Function that gives you one of the shortest way to go from one coordinate to another one
function knightMoves(begin, end) {

    //Check if the coordinates are in the grid of 8 * 8
    if ((begin[0] < 0 || begin[0] > 7) || (begin[1] < 0 || begin[1] > 7) || (end[0] < 0 || end[0] > 7) || (end[1] < 0 || end[1] > 7)) {
        return "The coordinates are wrong, remember the grid is only 8 * 8 starting at zero";
    //Check if the beginning and the end are the same
    } else if (begin[0] === end[0] && begin[1] === end[1]) {
        return begin;
    }

    //Variables to help in the function
    let theStopper = true;  //Tells the wile loop to stop
    let theQueue = [];      //Queue that receives the next moves of the knight
    let theCorrectCor = 0;  //Store the coordinate of the end when it is found
    let theTraversal = [];  //Store the traversal of the knight from the beginning to the end
    let alreadyUseMoves = [];   //Stores the moves that have already been use
    let repeatCoordinate = false;   //Bool value that checks if the move was already use
    let alreadyUseSon = [];     //Store the value of the next moves to avoid repetition

    //The first move that was use is the beginning
    alreadyUseMoves.push(begin);
    //Get the next moves of the knight from the beginning
    let possibleMovesArray = nextSteps(begin, alreadyUseMoves, alreadyUseSon);

    //For loop that goes through the initial movements
    for(let i = 0; i < possibleMovesArray.length; i++) {
        //If the end is similar to one of the next moves the path was found
        if(end[0] === possibleMovesArray[i][0] && end[1] === possibleMovesArray[i][1]) {
            console.log("The path is found: ");
            return [begin,end];
        }
    }

    //For loop that store the next moves in the queue
    for (let i = 0; i < possibleMovesArray.length; i++) {
        theQueue.push(possibleMovesArray[i]);
    }

    //Create a new tree
    let stepsTree = new Tree();
    //Build the tree from the beginning and its initial movements
    stepsTree.buildTree(possibleMovesArray, begin);

    //While loop that goes through all the movements in the queue
    while (theStopper ===  true) {
        repeatCoordinate = false;
        //Get the front value of the queue
        let nextMove = theQueue.splice(0,1);

        //For loop that goes through all the moves the knight already use
        for(let i = 0; i < alreadyUseMoves.length; i++) {
            //If the next move was already use
            if(nextMove[0][0] === alreadyUseMoves[i][0] && nextMove[0][1] === alreadyUseMoves[i][1]) {
                repeatCoordinate = true;
            }
        }

        //If the next moves has not been use yet
        if (repeatCoordinate === false) {
            //Get the new moves
            let newMoves = nextSteps(nextMove[0],alreadyUseMoves, alreadyUseSon);

            //For loops that puts all the new moves in the queue
            for (let i = 0; i < newMoves.length; i++) {
                theQueue.push(newMoves[i]);
            }

            //Insert the new moves in the tree and receive a bool value
            let finalFound = stepsTree.insert(newMoves, end);
            //If final found is true
            if(finalFound[0]) {
                //Get the end coordinate
                theCorrectCor = finalFound[1];
                //Stop the while loop
                theStopper = false;
            }

            //Put the move in the already use array
            alreadyUseMoves.push(nextMove[0]);
        }
    } 

    //If the end coordinate was found
    if(theCorrectCor !== 0) {
        console.log("The path is found: ");
        //Put in the front of the list the value of the node with the coordinate
        theTraversal.unshift(theCorrectCor.getCoordinate);
        //Found the father of the node
        theCorrectCor = theCorrectCor.getFather;
        //While the father is not null
        while(theCorrectCor !== null) {
            //Put in the front of the list the coordinate
            theTraversal.unshift(theCorrectCor.getCoordinate);
            //Found the father
            theCorrectCor = theCorrectCor.getFather;
        }
    }

    return theTraversal;
}


//Function that gives the next possible steps
function nextSteps(coordinates, alreadyUse, alreadySon) {

    //Variables that check if the coordinates do not repeat itself
    let repeatCor = false;
    let repeatSon = false;
    //Array that will store the next moves
    let totalMoves = [];
    //Set the values of the coordinate x and y
    let x = -1;
    let y = -2;

    //For loops that goes through the 8 possible moves of the knight
    for(let i = 1; i < 9; i++) {

        //Array that will store the coordinates of one of the eight possible movements
        let individualMoves = [];

        //If i is prime change its value, every one step it will change value
        if(i % 2 != 0) {
            x *= -1;
        }

        //Change the value of y
        y *= -1;

        //Check if the coordinates are not lesser and bigger than the board (the board is 8 * 8)
        if((coordinates[0] + x > -1 && coordinates[1] + y > -1) && (coordinates[0] + x <= 7 && coordinates[1] + y <= 7)) {

            repeatCor = false;
            repeatSon = false;
            //Put the coordinate in the array
            individualMoves.push(coordinates[0] + x, coordinates[1] + y);

            //For loop that checks if the new move was already use
            for(let i = 0; i < alreadyUse.length; i++) {
                if(individualMoves[0] === alreadyUse[i][0] && individualMoves[1] === alreadyUse[i][1]) {
                    repeatCor = true;
                }
            }

            //For loop that checks if the new move was already a son of another move
            for(let i = 0; i < alreadySon.length; i++) {
                if(individualMoves[0] === alreadySon[i][0] && individualMoves[1] === alreadySon[i][1]) {
                    repeatSon = true;
                }
            }

            //If the new move was not already use
            if (repeatCor === false && repeatSon === false) {
                alreadySon.push(individualMoves);
                totalMoves.push(individualMoves);
            }

        }

        //If i is 4 change the values of x and y
        if(i === 4){
            x = 2;
            y = 1;
        }
    }

    return totalMoves;
}

//The call of the function
console.log(knightMoves([0,0],[7,7])); 