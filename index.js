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

    // helper method to build a binary search tree from an array
    buildTree(dataArray) {
        // recursive function to insert a value into the tree
        function insertNode(node, data){
            if (node === null){
                return new Node(data) // create a new node if the current node is null
            }

            // compare the data and insert it in the left or right subtree
            if(data < node.data){
                node.left = insertNode(node.left, data)
            } else if (data > node.data){
                node.right = insertNode(node.right, data);
            }

            return node;
        }
        
        let root = null; // initialize the root node as null

        // insert each value from the dataArray into the tree
        for(const data of dataArray){
            root = insertNode(root, data);
        }

        return root;
    }
}

// Example usage:
const dataArray = [10, 5, 15, 3, 7, 12, 18];
const binaryTree = new Tree(dataArray);

console.log(binaryTree.root);