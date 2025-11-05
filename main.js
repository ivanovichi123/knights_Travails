import {Tree} from "./BSTA.js";


function knightMoves(begin, end) {
    if ((begin[0] < 0 || begin[0] > 7) || (begin[1] < 0 || begin[1] > 7) || (end[0] < 0 || end[0] > 7) || (end[1] < 0 || end[1] > 7)) {
        return "The coordinates are wrong, remember the grid is only 8 * 8 starting at zero";
    } else if (begin[0] === end[0] && begin[1] === end[1]) {
        return begin;
    }
    let theStopper = true;
    let theQueue = [];
    let theCorrectCor = 0;
    let theTraversal = [];
    let alreadyUseMoves = [];
    let repeatCoordinate = false;
    let alreadyUseSon = [];

    alreadyUseMoves.push(begin);
    let possibleMovesArray = nextSteps(begin,alreadyUseMoves, alreadyUseSon);

    for(let i = 0; i < possibleMovesArray.length; i++) {
        if(end[0] === possibleMovesArray[i][0] && end[1] === possibleMovesArray[i][1]) {
            return [begin,end];
        }
    }
    for (let i = 0; i < possibleMovesArray.length; i++) {
        theQueue.push(possibleMovesArray[i]);
    }

    console.log("begin at: ", begin, "Next moves: ", possibleMovesArray);

    let stepsTree = new Tree();
    stepsTree.buildTree(possibleMovesArray, begin);

    // console.log(stepsTree.getRoot.getCoordinate);
    // for(let i = 1; i < 9; i++) {
    //     console.log(stepsTree.getRoot[`getCor${i}`]);
    // }
    // console.log(stepsTree.getRoot.getCor1.getCoordinate);
    // console.log(stepsTree.getRoot.getCor2.getCoordinate);
    // console.log("the queue: ", theQueue);
    // console.log("Moves I already use: ", alreadyUseMoves);

    console.log("The queue before starting: ", theQueue);

    while (theStopper ===  true) {
        repeatCoordinate = false;
        let nextMove = theQueue.splice(0,1);
        for(let i = 0; i < alreadyUseMoves.length; i++) {
            if(nextMove[0][0] === alreadyUseMoves[i][0] && nextMove[0][1] === alreadyUseMoves[i][1]) {
                console.log("A repeat coordinate: ", nextMove, "In the array: ", alreadyUseMoves);
                repeatCoordinate = true;
            }
        }
        if (repeatCoordinate === false) {
            let newMoves = nextSteps(nextMove[0],alreadyUseMoves, alreadyUseSon);
            console.log("The current coordinate: ", nextMove, "Creates: ", newMoves);
            for (let i = 0; i < newMoves.length; i++) {
                theQueue.push(newMoves[i]);
            }

            let finalFound = stepsTree.insert(newMoves, end);
                if(finalFound[0]) {
                theCorrectCor = finalFound[1];
                console.log("The correct coordinate was: ", theCorrectCor);
                theStopper = false;
            }
            alreadyUseMoves.push(nextMove[0]);
            // console.log("End of the while, adding already use cor: ", alreadyUseMoves);
            // console.log("The queue at the end fo the while: ", theQueue);
        }
    } 

    console.log("Final use of moves: ", alreadyUseMoves);
    console.log("level order: ", stepsTree.getLevelOrder);

    // let a = stepsTree.getRoot.getCor2;
    // console.log(a.getCor2.getCoordinate);

    if(theCorrectCor !== 0) {
        console.log("The path is found: ");
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
function nextSteps(coordinates, alreadyUse, alreadySon) {

    let repeatCor = false;
    let repeatSon = false;


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

            repeatCor = false;
            repeatSon = false;
            individualMoves.push(coordinates[0] + x, coordinates[1] + y);

            for(let i = 0; i < alreadyUse.length; i++) {
                if(individualMoves[0] === alreadyUse[i][0] && individualMoves[1] === alreadyUse[i][1]) {
                    repeatCor = true;
                }
            }

            for(let i = 0; i < alreadySon.length; i++) {
                if(individualMoves[0] === alreadySon[i][0] && individualMoves[1] === alreadySon[i][1]) {
                    repeatSon = true;
                }
            }


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

console.log(knightMoves([0,0],[7,7])); 