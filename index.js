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

    // find a node with the given value in the BST
    find(value){
        return this.findNode(this.root, value)
    }

    findNode(node, value){
        // if the current node is null or its data matches the target value, return the current node
        if(node === null || node.data === value){
            return node;
        }

        if(value < node.data){
            // recursively search in the left subtree
            return this.findNode(node.left, value)
        } else {
            // recursively search in the right subtree
            return this.findNode(node.right, value)
        }
    }

    // iterative level-order traversal
    levelOrder(callback = null){
        if(!this.root){
            return [];
        }

        const result = [];
        const queue = [this.root]; // initialize a queue with the root node

        while(queue.length > 0){
            const currentNode = queue.shift(); // dequeue the front node

            if(callback){
                callback(currentNode) // call the provided callback function
            } else {
                result.push(currentNode.data) // push the current node's data into the result array
            }

            if (currentNode.left){
                queue.push(currentNode.left); //enqueue the left child if it exists
            }
            if (currentNode.right){
                queue.push(currentNode.right); //enqueue the right child if it exists
            }
        }

        return result;
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

// Find a node with the value 8 in the BST
const nodeToFind = tree.find(8);
console.log("\nFound Node with Value 8:", nodeToFind); // This will log the found node or null if not found

// Iterative level-order traversal and print values
tree.levelOrder((node) => {
    console.log(node.data);
});

// Iterative level-order traversal and return an array of values
const valuesArray = tree.levelOrder();
console.log("Level-Order Values Array:", valuesArray);