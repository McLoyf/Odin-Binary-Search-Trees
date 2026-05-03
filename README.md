<h1>Binary Search Tree</h1>

<p>
  A simple JavaScript binary search tree implementation made for The Odin Project.
</p>

<h2>Features</h2>

<ul>
  <li>Build a balanced tree from an array with <code>buildTree()</code></li>
  <li>Add values with <code>insert()</code></li>
  <li>Find nodes with <code>find()</code></li>
  <li>Remove values with <code>delete()</code></li>
  <li>Traverse the tree with <code>levelOrderForEach()</code></li>
  <li>Traverse in order with <code>inOrderForEach()</code></li>
  <li>Traverse pre-order with <code>preOrderForEach()</code></li>
  <li>Traverse post-order with <code>postOrderForEach()</code></li>
  <li>Check height with <code>height()</code></li>
  <li>Check depth with <code>depth()</code></li>
  <li>Check if the tree is balanced with <code>isBalance()</code></li>
  <li>Rebalance the tree with <code>rebalance()</code></li>
</ul>

<h2>Technologies Used</h2>

<ul>
  <li>JavaScript</li>
  <li>ES Modules</li>
  <li>Binary Search Tree data structure</li>
</ul>

<h2>Example Usage</h2>

<pre><code>import { Tree } from "./Tree.js";

const tree = new Tree([1, 52, 64, 98, 93, 82, 94]);

tree.insert(67);

console.log(tree.find(82));
// Node { data: 82, left: null, right: null }

console.log(tree.isBalance());
// true

tree.inOrderForEach(value => console.log(value));
// 1
// 52
// 64
// 67
// 82
// 93
// 94
// 98
</code></pre>

<h2>Project Notes</h2>

<p>
  This project was built to practice binary search trees, tree traversal,
  balancing, and recursive problem solving in JavaScript.
</p>