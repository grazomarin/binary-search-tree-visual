import { describe, it, expect } from 'vitest';
import { NodeFactory, Tree } from '../binary-tree';

describe('Binary Search Tree FC', () => {
	it('creates a balanced tree', () => {
		const bst = Tree();
		bst.buildTree([2, 1, 1, 4, 3, 5]);
		expect(bst.getTree()).toMatchObject({
			value: 3,
			left: {
				value: 1,
				left: null,
				right: {
					value: 2,
					left: null,
					right: null,
				},
			},
			right: {
				value: 4,
				left: null,
				right: { value: 5, left: null, right: null },
			},
		});
	});
});
