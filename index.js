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

    // insert a new node with the given value into the BST
    insert(value){
        // call the helper function to perform the insertion and update the root
        this.root = this.insertNode(this.root, value);
    }

    insertNode(node, value){
        // if the current node is null, create a new node with the given value
        if(node === null){
            return new Node(value);
        }

        // compare the value to the current node's data to determine the insertion direction
        if( value < node.data){
            // recursively insert into the left subtree
            node.left = this.insertNode(node.left, value)
        } else if (value > node. data) {
            // recursively insert into the right subtree
            node.right = this.insertNode(node.right, value)
        }

        return node;
    }

    //delete a node with the given value from BST
    delete(value){
        // call the helper function to perform the deletion and update the root
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node, value){
        // if the current nooe is null, return it (no change)
        if(node === null){
            return node;
        }

        // compare the value to the current node's data to determine the deletion direction
        if(value < node.data){
            node.left = this.deleteNode(node.left, value)
        } else if ( value > node.data){
            node.right = this.deleteNode(node.right, value)
        }else{
            // node with only one child or no child
            if(node.left === null && node.right === null){
                node = null;
            } else if (node.left === null ) {
                node = node.right;
            } else if (node.right === null ){
                node = node.left;
            } else {
                // node with two children
                // find the minimum value in the right subtree, replace the node value, and delete that node
                const minValue = this.findMinValue(node.right);
                node.data = minValue;
                node.right = this.deleteNode(node.right, minValue)
            }
        }

        return node;
    }

    findMinValue(node){
        // helper function to find the minimum value in a given subtree
        while(node.left !== null){
            node = node.left;
        }
        return node.data;
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
// Insert a new value (e.g., 20) into the BST
tree.insert(20);
console.log("\nTree After Inserting 20:");
prettyPrint(tree.root);

// Delete a value (e.g., 7) from the BST
tree.delete(7);
console.log("\nTree After Deleting 7:");
prettyPrint(tree.root);