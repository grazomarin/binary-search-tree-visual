interface Node {
	value: number;
	left: Node | null;
	right: Node | null;
}

export const NodeFactory = (value: number): Node => {
	return {
		value,
		left: null,
		right: null,
	};
};

export const Tree = () => {
	let tree: Node | null = null;

	function prettyPrint(node = tree, prefix = '', isLeft = true) {
		if (node === null) {
			throw new Error('there is no tree to pretty print');
		}
		if (node.right !== null) {
			prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
		if (node.left !== null) {
			prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	}

	function buildTree(value: number[]) {
		if (value.length === 0) return null;
		const sorted = [...new Set(value.sort((a, b) => a - b))];
		const middleIndex = Math.floor((sorted.length - 1) / 2);
		tree = NodeFactory(sorted[middleIndex]);
		tree.left = buildRecursion(sorted.slice(0, middleIndex));
		tree.right = buildRecursion(sorted.slice(middleIndex + 1));
		function buildRecursion(array: number[]): Node | null {
			if (array.length === 0) return null;
			const middleIndex = Math.floor((array.length - 1) / 2);
			const node = NodeFactory(array[middleIndex]);
			node.left = buildRecursion(array.slice(0, middleIndex));
			node.right = buildRecursion(array.slice(middleIndex + 1));
			return node;
		}
	}

	function insert(value: number, node = tree) {
		if (!node) throw new Error('there is no tree to insert into');
		if (value === node.value) return;
		if (value < node.value) {
			if (node.left) insert(value, node.left);
			else node.left = NodeFactory(value);
		}
		if (value > node.value) {
			if (node.right) insert(value, node.right);
			else node.right = NodeFactory(value);
		}
	}

	function remove(value: number) {
		//DELETING A LEAF NODE:
		//if the node has no children make the node equal null
		//DELETING A NODE WITH A SINGLE CHILD
		// assign the child to the current node
		//DELETING A NODE WITH BOTH CHILDREN
		// assign the node to the smallest out of the bigger nodes
		if (!tree) throw new Error('there is no tree to delete from');
		let nodeToBeDeleted: Node | null | undefined = find(value);
		if (!nodeToBeDeleted) throw new Error('cannot remove a non-existent node');
		if (nodeToBeDeleted.right) {
			let pointer: Node | null = nodeToBeDeleted.right;
			if (!pointer.left) {
				nodeToBeDeleted.value = nodeToBeDeleted.right.value;
				nodeToBeDeleted.right = nodeToBeDeleted.right.right;
			}
			while (pointer.left) {
				if (!pointer.left.left) {
					nodeToBeDeleted.value = pointer.left.value;
					pointer.left = pointer.left.right;
					return;
				}
				pointer = pointer.left;
			}
		}
		if (nodeToBeDeleted.left) {
			nodeToBeDeleted = nodeToBeDeleted.left;
			return;
		}
		nodeToBeDeleted = null;
	}

	function find(value: number, node = tree) {
		if (!node) throw new Error('node is not found');
		if (node.value === value) return node;
		if (value < node.value) return find(value, node.left);
		if (value > node.value) return find(value, node.right);
	}

	function levelOrder(): number[] {
		if (!tree) throw new Error('cannot traverse an empty tree');
		const queue: Node[] = [tree];
		const returnArray: number[] = [];
		while (queue.length !== 0) {
			const current = queue.shift();
			if (current) {
				returnArray.push(current.value);
				if (current.left) queue.push(current.left);
				if (current.right) queue.push(current.right);
			}
		}
		return returnArray;
	}

	function inorder(node = tree): number[] {
		if (!node) return [];
		return [...inorder(node.left), node.value, ...inorder(node.right)];
	}

	function preorder(node = tree): number[] {
		if (!node) return [];
		return [node.value, ...preorder(node.left), ...preorder(node.right)];
	}

	function postorder(node = tree): number[] {
		if (!node) return [];
		return [...postorder(node.left), ...postorder(node.right), node.value];
	}

	function height(node = tree, h = 0): number {
		if (!node) return h;
		const left = height(node.left, h + 1);
		const right = height(node.right, h + 1);
		return left >= right ? left : right;
	}

	return {
		getTree: () => tree,
		prettyPrint,
		buildTree,
		insert,
		remove,
		find,
		levelOrder,
		inorder,
		preorder,
		postorder,
		height,
	};
};
