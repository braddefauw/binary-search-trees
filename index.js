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

    // in-order traversal
    inorder(callback = null){
        const result = [];
        this.inorderTraversal(this.root, callback, result);
        return result;
        }

        inorderTraversal(node, callback, result){
            if(node === null){
                return;
            }

            // recursively traverse the left subtree
            this.inorderTraversal(node.left, callback, result);
            // prrocess the current node
            if(callback){
                callback(node) //call the provided callback with the current node
            } else {
                result.push(node.data) // add the current node's data to the result array
            }

            // recursively traverse the right subtree
            this.inorderTraversal(node.right, callback, result);
    }

    // pre-order traversal
    preorder(callback = null){
        const result = [];
        this.preorderTraversal(this.root, callback, result);
        return result;
    }

    preorderTraversal(node, callback, result){
        if (node === null){
            return;
        }
        // process the current node
        if(callback){
            callback(node); // call the provided callback with the current node
        } else {
            result.push(node.data) // add the current node's data to the result array
        }
        // recursively traverse the left subtree
        this.preorderTraversal(node.left, callback, result);
        // recursively traverse the right subtree
        this.preorderTraversal(node.right, callback, result);
    }

    //post-order traversal
    postorder(callback = null) {
        const result = [];
        this.postorderTraversal(this.root, callback, result);
        return result;
    }

    postorderTraversal(node, callback, result){
        if (node === null){
            return;
        }
        
        // recursively traverse the left subtree
        this.postorderTraversal(node.left, callback, result);
        // recursively traverse the right subtree
        this.postorderTraversal(node.right, callback, result)
        // process the current node
        if(callback){
            callback(node) // call the provided callback with the current node
        } else {
            result.push(node.data) // add the current node's data to the result array
        }
    }

    height(node){
        return this.getNodeHeight(node);
    }

    getNodeHeight(node){
        if(node === null){
            return -1; // height of null node is -1 (counting edges)
        }

        // recursively compute teh height of the left and right subtrees
        const leftHeight = this.getNodeHeight(node.left);
        const rightHeight = this.getNodeHeight(node.right);

        // the height of the node is the maximum height of its left or right subtree, plus 1 (for the current node)
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // get the depth of a node
    depth(node){
        return this.getNodeDepth(this.root, node)
    }

    getNodeDepth(currentNode, targetNode, currentDepth = 0){
        if (currentNode === null){
            return -1; // node not found in tree
        }

        if (currentNode === targetNode){
            return currentDepth;
        }

        // recursively search for the node in the left and right subtrees
        const leftDepth = this.getNodeDepth(currentNode.left, targetNode, currentDepth + 1);
        if (leftDepth !== -1){
            return leftDepth; // node found in the left subtree
        }

        const rightDepth = this.getNodeDepth(currentNode.right, targetNode, currentDepth + 1);
        if (rightDepth !== -1){
            return rightDepth; //node found in the right subtree
        }

        return -1; // node not found in the current subtree
    }

    // check if the tree is balanced
    isBalanced(){
        return this.checkBalanced(this.root);
    }

    checkBalanced(node){
        if(node === null){
            return true; //an empty tree is always balanced
        }

        // calculate the heights of the left and right subtrees
        const leftHeight = this.getHeight(node.left);
        const rightHeight = this.getHeight(node.right);

        // check if the tree rooted at the current node is balanced
        if(Math.abs(leftHeight - rightHeight) <= 1 && this.checkBalanced(node.left) && this.checkBalanced(node.right)) {
            return true;
        }

        return false; // the tree is not balanced
    }

    getHeight(node){
        if (node === null){
            return 0; // the height of an empty tree is 0
        }

        // recursively calcualte the height
        const leftHeight = this.getHeight(node.left);
        const rightHeight = this.getHeight(node.right);

        // the height of the tree rooted at the current node is the maximum of the heights of its subtrees, plus 1
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // rebalance the tree
    rebalance(){
        // collect all nodes in sorted order using an in-order traversal
        const nodes = this.inorderTraversalToArray(this.root);

        // build a new balanced BST from the collected nodes
        this.root = this.buildTree(nodes);

        return this.root;
    }

    inorderTraversalToArray(node){
        const result = [];
        this.inorderToArray(node, result);
        return result;
    }

    inorderToArray(node, result){
        if (node === null){
            return;
        }

        this.inorderToArray(node.left, result);
        result.push(node);
        this.inorderToArray(node.right, result);
    }

    buildTree(nodes){
        // recursive function to build a balanced binary search tree from an array of nodes
        if(nodes.length === 0){
            return null;
        }

        const mid = Math.floor(nodes.length/2);
        const root = new Node(nodes[mid]);

        // recursively build left and right subtrees
        root.left = this.buildTree(nodes.slice(0, mid));
        root.right = this.buildTree(nodes.slice(mid + 1));

        return root;
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

/* *** EXAMPLE USAGE *** */
const dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(dataArray);
// Check if the tree is balanced
const isBalanced = tree.isBalanced();
console.log("Is the Tree Balanced?", isBalanced);
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

// In-order traversal and print values
tree.inorder((node) => {
    console.log(node.data);
});

// Pre-order traversal and return an array of values
const preorderValues = tree.preorder();
console.log("Pre-Order Values Array:", preorderValues);

// Post-order traversal and print values
tree.postorder((node) => {
    console.log(node.data);
});

// Get the height of the root node
const rootHeight = tree.height(tree.root);
console.log("Height of the Root Node:", rootHeight);

// Get the height of a specific node (e.g., node with value 4)
const nodeToFindTwo = tree.find(4);
const nodeHeight = tree.height(nodeToFindTwo);
console.log("Height of the Node with Value 4:", nodeHeight);

// Get the depth of the root node (it should be 0)
const rootDepth = tree.depth(tree.root);
console.log("Depth of the Root Node:", rootDepth);

// Get the depth of a specific node (e.g., node with value 4)
const nodeToFindThree = tree.find(4);
const nodeDepth = tree.depth(nodeToFindThree);
console.log("Depth of the Node with Value 4:", nodeDepth);

// Check if the tree is balanced
const isBalancedAgain = tree.isBalanced();
console.log("Is the Tree Balanced?", isBalancedAgain);

const newDataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const unbalancedTree = new Tree(newDataArray);

console.log("Unbalanced Tree:");
prettyPrint(unbalancedTree.root);

// Rebalance the tree
unbalancedTree.rebalance();
console.log("\nRebalanced Tree:");
prettyPrint(unbalancedTree.root);

const isBalancedFinal = unbalancedTree.isBalanced();
console.log("Is the Tree Balanced?", isBalancedFinal);