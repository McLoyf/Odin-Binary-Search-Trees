import { Tree } from "./BalBST.js";

function randomArray(size = 15) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

function printOrders(tree) {
    tree.inOrderForEach(value => console.log(value));
    tree.preOrderForEach(value => console.log(value));
    tree.postOrderForEach(value => console.log(value));
    tree.levelOrderForEach(value => console.log(value));
}

const numbers = randomArray();

console.log("Random array:", numbers);

const tree = new Tree(numbers);

console.log("Balanced?", tree.isBalance());

printOrders(tree);

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);
tree.insert(106);

console.log("Balanced after inserting > 100?", tree.isBalance());

tree.rebalance();

console.log("Balanced after rebalance?", tree.isBalance());

printOrders(tree);