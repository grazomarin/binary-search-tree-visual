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

	return {
		getTree: () => tree,
	};
};
