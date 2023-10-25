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
        this.root = this.buildTree(dataArray) //initialize the root using buildTree method
    }

    // helper method to build a balanced binary search tree from an array
    buildTree(dataArray) {
       // step 1: sort the array and remove duplicates
       const sortedUniqueArray = Array.from(new Set(dataArray)).sort((a, b) => a - b)

       // step 2: define a recursive function to bulid the tree
       function createBST(arr, start, end){
        if (start > end){
            return null;
        }

        // find the middle index
        const mid = Math.floor((start + end)/ 2);

        // create a new node with the middle element
        const node = new Node(sortedUniqueArray[mid]);

        //recursively build the left and right subtrees
        node.left = createBST(arr, start, mid - 1);
        node.right = createBST(arr, mid + 1, end);

        return node;
       }
       //step 3: call the rescursive function to build the tree
       return createBST(sortedUniqueArray, 0, sortedUniqueArray.length -1);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Example usage:
const dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(dataArray);
// call the prettyPrint function with the root of the tree
prettyPrint(tree.root)