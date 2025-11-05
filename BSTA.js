class Node {
    #coordinates; //Value of the node
    #cor1;
    #cor2;
    #cor3;
    #cor4;
    #cor5;
    #cor6;
    #cor7;
    #cor8;
    #counter;
    #father;

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

class Tree {
    #root;      //Root of the tree
    #next;
    #nextFather;
    #levelOrder;
    #nodesUse;

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
        let rootNode = new Node(root);
        this.#root = rootNode;
        for(let i = 0; i < array.length; i++) {
            let leafNode = new Node(array[i]);
            this.#root[`setCor${i + 1}`](leafNode);
            leafNode.setFather(this.#root);
        }
        this.#nextFather = this.#root;
        this.#next = this.#root.getCor1;
        this.#levelOrder = this.levelOrder(this.#root, this.#nodesUse);
        //Return the root
        return this.#root;
    }

    //Function that inserts a new value
    insert(coordinates, end) {
        while(this.#next === null) { //IDEA CAMBIAR ESTE IF A UN WHILE
            console.log("The next is null");
            this.#levelOrder.splice(0,1);
            this.#nodesUse += 1;
            if(this.#levelOrder.length === 0) {
                this.#levelOrder = this.levelOrder(this.#root, this.#nodesUse);
                console.log("The new level order: ", this.#levelOrder);
            }

            this.#nextFather = this.#levelOrder[0];
            console.log("The new value of the nextFather: ", this.#nextFather.getCoordinate);
            this.#next = (this.#nextFather[`getCor${this.#nextFather.getCounter}`]);

        }
        let currentNode = this.#next;
        console.log("The current Node: ", currentNode.getCoordinate);
        console.log("The coordinates: ", coordinates, "Have a length of: ", coordinates.length);
        for(let i = 0; i < coordinates.length; i++) {
            let leafNode = new Node(coordinates[i]);
            console.log("The leaf Node: ", leafNode.getCoordinate, "Is son of: ", currentNode.getCoordinate);
            currentNode[`setCor${i + 1}`](leafNode);
            leafNode.setFather(currentNode);
            if(coordinates[i][0] === end[0] && coordinates[i][1] === end[1]) {
                console.log("I found the coordinate");
                return [true, leafNode];
            }
        }
        this.#nextFather.setCounter(this.#nextFather.getCounter + 1);
        console.log("The new counter of the nextFather is: ", this.#nextFather.getCounter);
        if(this.#nextFather.getCounter > 8) {
            console.log("The counter of nextFather is bigger than 8");
            this.#next = null;
        } else {
            this.#next = (this.#nextFather[`getCor${this.#nextFather.getCounter}`]);
            console.log("The new value of the next is: ", (this.#next === null) ? "null" : this.#next.getCoordinate);
        }
        return false;
    }

    levelOrder(node, useAlready) {
        console.log("Level order start");
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
            theStorage.push(theFront[0]);
            console.log(theFront[0].getCoordinate);
            //Temporal function is the value of the front of the list
            temporalNode = theFront[0];
            //If there is a node in the left
            if(temporalNode.getCor1 != null) {
                //Push the left child in the array
                theQueue.push(temporalNode.getCor1);
            }
            if(temporalNode.getCor2 != null) {
                //Push the left child in the array
                theQueue.push(temporalNode.getCor2);
            }
            if(temporalNode.getCor3 != null) {
                //Push the left child in the array
                theQueue.push(temporalNode.getCor3);
            }
            if(temporalNode.getCor4 != null) {
                //Push the left child in the array
                theQueue.push(temporalNode.getCor4);
            }
            if(temporalNode.getCor5 != null) {
                //Push the left child in the array
                theQueue.push(temporalNode.getCor5);
            }
            if(temporalNode.getCor6 != null) {
                //Push the left child in the array
                theQueue.push(temporalNode.getCor6);
            }
            if(temporalNode.getCor7 != null) {
                //Push the left child in the array
                theQueue.push(temporalNode.getCor7);
            }
            if(temporalNode.getCor8 != null) {
                //Push the left child in the array
                theQueue.push(temporalNode.getCor8);
            }
        }
        console.log("Level order finish");
        if(useAlready > 0) {
            theStorage.splice(0,useAlready);
        }
        return theStorage;
    }
}

    // preOrderForEach(callback, node = this.#root) {
    // }

    // depth(value, node = this.#root, count = 0) {
    // }


export {Tree};