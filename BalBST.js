class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);

        if (sortedArray.length === 0) return null;

        const mid = Math.floor((0 + sortedArray.length - 1) / 2);
        const root = new Node(sortedArray[mid]);

        const queue = [
            {
                node: root,
                start: 0,
                end: sortedArray.length - 1
            }
        ];

        while (queue.length > 0) {
            const current = queue.shift();
            const { node, start, end } = current;

            const midIndex = Math.floor((start + end) / 2);

            const leftStart = start;
            const leftEnd = midIndex - 1;

            if (leftStart <= leftEnd) {
                const leftMid =  Math.floor((leftStart + leftEnd) / 2);
                node.left = new Node(sortedArray[leftMid]);

                queue.push({
                    node: node.left,
                    start: leftStart,
                    end: leftEnd
                });
            }

            const rightStart = midIndex + 1;
            const rightEnd = end;

            if (rightStart <= rightEnd) {
                const rightMid = Math.floor((rightStart + rightEnd) / 2);
                node.right = new Node(sortedArray[rightMid]);

                queue.push({
                    node: node.right,
                    start: rightStart,
                    end: rightEnd
                });
            }
        }
        return root;
    }

    insert(value) {
        const newNode = new Node(value);

        if (this.root == null) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while (true) {
            if (value < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else if (value > current.data) {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            } else {
                return;
            }
        }
    }

    find(value) {
        let current = this.root;

        while (current !== null) {
            if (value === current.data) {
                return current;
            } else if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    }

    delete(value) {
        let parent = null;
        let current = this.root;

        while (current !== null && current.data !== value) {
            parent = current;

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        if (current == null) return;

        if (current.left !== null && current.right !== null) {
            let successorParent = current;
            let successor = current.right;

            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }

            current.data = successor.data;

            parent = successorParent;
            current = successor;
        }

        let child = null;

        if (current.left !== null) {
            child = current.left;
        } else if (current.right !== null) {
            child =  current.right;
        }

        if (parent === null) {
            this.root = child;
        } else if (parent.left === current) {
            parent.left = child;
        } else {
            parent.right = child;
        }
    }

    levelOrderForEach(callback) {
        if (this.root === null) return [];

        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const current = queue.shift();

            if (callback) {
                callback(current);
            } else {
                result.push(current.data);
            }

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }

        return callback ? undefined : result;
    }

    inOrderForEach(callback) {
        if (!callback) {
            throw new Error("Callback is required");
        }

        const stack = [];
        let current = this.root;

        while (stack.length > 0 || current !== null) {
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }

            current = stack.pop();
            callback(current.data);

            current = current.right;
        }
    }

    preOrderForEach(callback) {
        if (!callback) {
            throw new Error("Callback is required");
        }

        if (this.root === null) return;

        const stack = [this.root];

        while (stack.length > 0) {
            const current = stack.pop();

            callback(current.data);

            if (current.right) stack.push(current.right);
            if (current.left) stack.push(current.left);
        }
    }

    postOrderForEach(callback) {
    if (!callback) {
        throw new Error("Callback is required");
    }

    if (this.root === null) return;

    const stack1 = [this.root];
    const stack2 = [];

    while (stack1.length > 0) {
        const current = stack1.pop();
        stack2.push(current);

        if (current.left) stack1.push(current.left);
        if (current.right) stack1.push(current.right);
    }

    while (stack2.length > 0) {
        callback(stack2.pop().data);
    }
}
    
    height(value) {
        const node = this.find(value);

        if (node === null) return null;

        return this.#recursHeight(node);
    }

    #recursHeight(node) {
        if (node === null) return -1;

        const leftHeight = this.#recursHeight(node.left);
        const rightHeight = this.#recursHeight(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(value) {
        let current = this.root;
        let depth = 0;

        while (current !== null) {
            if (value === current.data) {
                return depth;
            }

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }

            depth++;
        }

        return null;
    }

    isBalance() {
        return this.#checkHeight(this.root) !== -1;
    }

    #checkHeight(node) {
        if (node === null) return 0;

        const leftHeight = this.#checkHeight(node.left);
        if (leftHeight === -1) return -1;

        const rightHeight = this.#checkHeight(node.right);
        if (rightHeight === -1) return -1;

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return Math.max(leftHeight, rightHeight) + 1;
    }

    rebalance() {
        const values = [];

        this.inOrderForEach(value => {
            values.push(value);
        });

        this.root = this.buildTree(values);
    }
}