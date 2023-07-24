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

	return {
		getTree: () => tree,
		prettyPrint,
		buildTree,
		insert,
	};
};
