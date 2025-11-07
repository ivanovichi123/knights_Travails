//Class of the nodes
class Node {
    #coordinates; //Value of the node
    #cor1;        //The next coordinate of the node (A knight in chess normally has 8 possible movements)
    #cor2;
    #cor3;
    #cor4;
    #cor5;
    #cor6;
    #cor7;
    #cor8;
    #counter;   //Variable that tells how many children of the father have been filled
    #father;    //Father of the node

    //Constructor
    constructor (coordinates = 0, cor1 = null, cor2 = null, cor3 = null, cor4 = null, cor5 = null, cor6 = null, cor7 = null, cor8 = null, counter = 1, father = null) {
        this.#coordinates = coordinates;
        this.#cor1 = cor1;
        this.#cor2 = cor2;
        this.#cor3 = cor3;
        this.#cor4 = cor4;
        this.#cor5 = cor5;
        this.#cor6 = cor6;
        this.#cor7 = cor7;
        this.#cor8 = cor8;
        this.#counter = counter;
        this.#father = father;
    }

    get getCoordinate() {
        return this.#coordinates;
    }

    get getCor1() {
        return this.#cor1;
    }

    get getCor2() {
        return this.#cor2;
    }

    get getCor3() {
        return this.#cor3;
    }

    get getCor4() {
        return this.#cor4;
    }

    get getCor5() {
        return this.#cor5;
    }

    get getCor6() {
        return this.#cor6;
    }

    get getCor7() {
        return this.#cor7;
    }

    get getCor8() {
        return this.#cor8;
    }

    get getCounter() {
        return this.#counter;
    }

    get getFather() {
        return this.#father;
    }

    setCor1(value) {
        this.#cor1 = value;
    }

    setCor2(value) {
        this.#cor2 = value;
    }

    setCor3(value) {
        this.#cor3 = value;
    }

    setCor4(value) {
        this.#cor4 = value;
    }

    setCor5(value) {
        this.#cor5 = value;
    }

    setCor6(value) {
        this.#cor6 = value;
    }

    setCor7(value) {
        this.#cor7 = value;
    }

    setCor8(value) {
        this.#cor8 = value;
    }

    setCounter(value) {
        this.#counter = value;
    }

    setValue(value) {
        this.#coordinates = value;
    }

    setFather(value) {
        this.#father = value;
    }
}

//Class of the tree
class Tree {
    #root;      //Root of the tree
    #next;      //Node that will receive the next moves
    #nextFather;    //Father of the node that will receive the next moves
    #levelOrder;    //Stores the level order of the nodes
    #nodesUse;      //Store a number that tells how much nodes have been already fill

    constructor(root = 0, next = 0, nextFather = 0, levelOrder = 0, nodesUse = 0) {
        this.#root = root;
        this.#next = next;
        this.#nextFather = nextFather;
        this.#levelOrder = levelOrder;
        this.#nodesUse = nodesUse;
    }

    get getRoot() {
        return this.#root;
    }

    get getLevelOrder() {
        return this.#levelOrder;
    }

    //Functions that builds the tree
    buildTree(array, root) {
        //Create a new node
        let rootNode = new Node(root);
        //Root points to the node
        this.#root = rootNode;
        //For loop that goes through the array of the next moves of the root
        for(let i = 0; i < array.length; i++) {
            //Create a new leaf node
            let leafNode = new Node(array[i]);
            //Set the respective coordinate
            this.#root[`setCor${i + 1}`](leafNode);
            //Point to the father
            leafNode.setFather(this.#root);
        }
        //Set the father of the next
        this.#nextFather = this.#root;
        //Set the next to the first child of the root
        this.#next = this.#root.getCor1;
        //Store the level order
        this.#levelOrder = this.levelOrder(this.#root, this.#nodesUse);
        //Return the root
        return this.#root;
    }

    //Function that inserts a new value
    insert(coordinates, end) {
        //While loop that stops when the next is null (when all the children of the next father have been fill with moves)
        while(this.#next === null) {
            //Get the front element in the level order
            this.#levelOrder.splice(0,1);
            //Increase the amount of nodes use
            this.#nodesUse += 1;
            //Check if the level order is empty
            if(this.#levelOrder.length === 0) {
                //Store a new level order 
                this.#levelOrder = this.levelOrder(this.#root, this.#nodesUse);
            }

            //The new next father is the next node in the level order
            this.#nextFather = this.#levelOrder[0];
            //The new next value is the first node of the next father
            this.#next = (this.#nextFather[`getCor${this.#nextFather.getCounter}`]);
        }

        //Get the node that will store the next moves
        let currentNode = this.#next;
        //For loop that sets all the next moves
        for(let i = 0; i < coordinates.length; i++) {
            //Create a new node
            let leafNode = new Node(coordinates[i]);
            //Set the new node
            currentNode[`setCor${i + 1}`](leafNode);
            //Set the father
            leafNode.setFather(currentNode);
            //Check if the new move is the final coordinate we are searching
            if(coordinates[i][0] === end[0] && coordinates[i][1] === end[1]) {
                //Return the node with the end coordinate
                return [true, leafNode];
            }
        }

        //Make that the nextFather counter increase (meaning that one of his children have already been fill)
        this.#nextFather.setCounter(this.#nextFather.getCounter + 1);
        //Check if the counter is greater than eight (all the children have been fill)
        if(this.#nextFather.getCounter > 8) {
            //Set next to null, to make that in the next call nodeFather change its value
            this.#next = null;
        } else {
            //Next now is the next child of the nextFather
            this.#next = (this.#nextFather[`getCor${this.#nextFather.getCounter}`]);
        }
        //Return false if the end coordinate was not found
        return false;
    }

    //Function that returns the level order of the tree
    levelOrder(node, useAlready) {
        //Array that will store the nodes
        let theStorage = [];
        //Create an array that will function like a queue
        let theQueue = [];
        //Start at the root
        let temporalNode = node;
        //Push the node in the array
        theQueue.push(temporalNode);
        //While loop that stops when the array is empty
        while (theQueue.length !== 0) {
            //Get the front element of the array
            let theFront = theQueue.splice(0,1);
            //Store the node
            theStorage.push(theFront[0]);
            //Temporal is the root (the beginning of the tree)
            temporalNode = theFront[0];
            //If there is a node in the coordinate 1
            if(temporalNode.getCor1 != null) {
                //Push the coordinate in the queue
                theQueue.push(temporalNode.getCor1);
            }
            //If there is a node in the coordinate 2
            if(temporalNode.getCor2 != null) {
                //Push the coordinate in the queue
                theQueue.push(temporalNode.getCor2);
            }
            //If there is a node in the coordinate 3
            if(temporalNode.getCor3 != null) {
                //Push the coordinate in the queue
                theQueue.push(temporalNode.getCor3);
            }
            //If there is a node in the coordinate 4
            if(temporalNode.getCor4 != null) {
                //Push the coordinate in the queue
                theQueue.push(temporalNode.getCor4);
            }
            //If there is a node in the coordinate 5
            if(temporalNode.getCor5 != null) {
                //Push the coordinate in the queue
                theQueue.push(temporalNode.getCor5);
            }
            //If there is a node in the coordinate 6
            if(temporalNode.getCor6 != null) {
                //Push the coordinate in the queue
                theQueue.push(temporalNode.getCor6);
            }
            //If there is a node in the coordinate 7
            if(temporalNode.getCor7 != null) {
                //Push the coordinate in the queue
                theQueue.push(temporalNode.getCor7);
            }
            //If there is a node in the coordinate 8
            if(temporalNode.getCor8 != null) {
                ///Push the coordinate in the queue
                theQueue.push(temporalNode.getCor8);
            }
        }

        //Check if the already use nodes is more than 0
        if(useAlready > 0) {
            //Delete the from the beginning to the number of nodes that we already use
            theStorage.splice(0,useAlready);
        }

        //Return the array with the nodes
        return theStorage;
    }
}

export {Tree};