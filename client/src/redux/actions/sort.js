/**
 * It takes an array of objects, and returns a new array of objects, sorted by the name property of
 * each object.
 * @param array - The array to be sorted.
 * @returns The array is being sorted by name in ascending order.
 */
export const orderAscName = (array) => {
	return array.sort((x, y) => {
		const nameX = x.name.toLowerCase();
		const nameY = y.name.toLowerCase();
		if (nameX < nameY) {
			return -1;
		}
		if (nameX > nameY) {
			return 1;
		}
		return 0;
	});
};

/**
 * It takes an array of objects, and returns a new array of objects sorted by the name property in
 * descending order.
 * @param array - The array to be sorted.
 * @returns The array is being sorted by name in descending order.
 */
export const orderDescName = (array) => {
	return array.sort((x, y) => {
		const nameX = x.name.toLowerCase();
		const nameY = y.name.toLowerCase();
		if (nameX < nameY) {
			return 1;
		}
		if (nameX > nameY) {
			return -1;
		}
		return 0;
	});
};

/**
 * It takes an array of objects and returns a new array of objects sorted by the weight property.
 * @param array - The array to be sorted.
 * @returns An array of objects, ordered by weight.
 */
export const orderAscWeight = (array) => {
	return array.sort((x, y) => {
		const X = x.weight;
		const Y = y.weight;
		if (X < Y) {
			return -1;
		}
		if (X > Y) {
			return 1;
		}
		return 0;
	});
};

/**
 * Sort the array by the weight property in descending order.
 * @param array - The array to be sorted.
 * @returns An array of objects sorted by weight in descending order.
 */
export const orderDescWeight = (array) => {
	return array.sort((x, y) => {
		const X = x.weight;
		const Y = y.weight;
		if (X < Y) {
			return 1;
		}
		if (X > Y) {
			return -1;
		}
		return 0;
	});
};
