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

	it('inserts a number', () => {
		const bst = Tree();
		bst.buildTree([1, 2, 3, 4, 5]);
		bst.insert(6);
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
				right: {
					value: 5,
					left: null,
					right: { value: 6, left: null, right: null },
				},
			},
		});
	});

	it('deletes a number', () => {
		const bst = Tree();
		bst.buildTree([1, 2, 3, 4, 5]);
		console.log(bst.prettyPrint());
		bst.remove(3);
		console.log(bst.prettyPrint());
		expect(bst.getTree()).toMatchObject({
			value: 4,
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
				value: 5,
				left: null,
				right: null,
			},
		});
	});

	it('finds a node', () => {
		const bst = Tree();
		bst.buildTree([12, 43, 54, 1, 43, 5, 10]);
		const found = bst.find(10);
		expect(found!.value).toBe(10);
		expect(found).toMatchObject({
			value: 10,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			right: expect.any(Object) || expect.anything(),
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			left: expect.any(Object) || expect.anything(),
		});
		expect(() => bst.find(99)).toThrow();
	});

	it('traverses a tree in Level Order', () => {
		const bst = Tree();
		bst.buildTree([1, 2, 3, 4, 5]);
		expect(bst.levelOrder()).toEqual([3, 1, 4, 2, 5]);
	});

	it('traverses a tree in Inorder', () => {
		const bst = Tree();
		bst.buildTree([1, 2, 3, 4, 5]);
		expect(bst.inorder()).toEqual([1, 2, 3, 4, 5]);
	});

	it('traverses a tree in Preorder', () => {
		const bst = Tree();
		bst.buildTree([1, 2, 3, 4, 5]);
		expect(bst.preorder()).toEqual([3, 1, 2, 4, 5]);
	});

	it('traverses a tree in Postorder', () => {
		const bst = Tree();
		bst.buildTree([1, 2, 3, 4, 5]);
		expect(bst.postorder()).toEqual([2, 1, 5, 4, 3]);
	});

	it('returns the height of the tree', () => {
		const bst = Tree();
		bst.buildTree([1, 2, 3, 4, 5]);
		expect(bst.height()).toBe(3);
		bst.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		expect(bst.height()).toBe(4);
	});

	it('returns depth of the tree', () => {
		const bst = Tree();
		bst.buildTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		expect(bst.depth(8)).toBe(2);
	});
});
