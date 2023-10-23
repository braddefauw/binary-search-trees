// create a node class for the binary search tree
class Node {
    // constructor to initialize a new node
    constructor(data){
        this.data = data; // data to be stored in the node
        this.left = null; // reference to the left child node
        this.right = null; // reference to the right child node
    }
}

// create a tree class
class Tree {
    constructor(dataArray){
        this.root = this.buildTree(dataArray, 0, dataArray.length -1) //initialize the root using buildTree method
    }

    // helper method to build a balanced binary search tree from an array
    buildTree(dataArray, start, end) {
       // if the start index is greater than the end index, return null
       if (start > end){
        return null;
       }

       // calculate the middle index to find the middle element
       const mid = Math.floor((start + end)/2);

       // create a new node using the middle element of the array
       const node = new Node(dataArray[mid]);

       // recursively build the left subtree from the elements before the middle
       node.left = this.buildTree(dataArray, start, mid-1);

       // recursively build the right subtree from the elements after the middle
       node.right = this.buildTree(dataArray, mid + 1, end);

       // return the root node of the balanced tree
       return node;
    }
}

// Example usage:
const dataArray = [3, 5, 7, 10, 12, 15, 18]; // Sorted and deduplicated data
const balancedTree = new Tree(dataArray);

console.log(balancedTree.root);