
/**
 * Creates a 2D array of the specified size, where each element is the provided `item` or the result of calling a function.
 * 
 * @param {number} size - The size of the 2D array (both rows and columns will have this size).
 * @param {any|function} item - The item to populate the array with. If it's a function, it will be invoked to generate each element.
 * @returns {Array<Array<any>>} A 2D array of the specified size filled with the `item` or the result of calling the `item` function.
 */
export const create2DArray = (size,item) => Array.from({ length: size }, () => Array.from({ length: size }, () => typeof item === "function"? item() : item))

/**
 * Generates column clues from a nonogram array.
 * A column clue is a list of consecutive filled cells (represented by 1s) in a column.
 * 
 * @param {Array<Array<number>>} nonogramArr - A 2D array of a nonogram grid.
 * @returns {Array<Array<number>>} A 2D array of column clues, where each array represents the consecutive 1s in the respective column.
 */
export const createColumnClues = (nonogramArr) => nonogramArr[0].map((_, col) => {
	const counts = [];
	let count = 0;
	for (const row of nonogramArr) 
		count = row[col] === 1 ? 
		count + 1 : 
		(count ? 
			(counts.push(count), 0): 
			count
		)
	
	if (count) counts.push(count);
	if (counts.length === 0) return [0]
	return counts;
});

/**
 * Generates row clues from a nonogram array.
 * A row clue is a list of consecutive filled cells (represented by 1s) in a row.
 * 
 * @param {Array<Array<number>>} nonogramArr - A 2D array representing the nonogram grid.
 * @returns {Array<Array<number>>} An array of row clues, where each array represents the consecutive 1s in the respective row.
 */
export const createRowClues = (nonogramArr) => nonogramArr.map( row => {
	const counts = [];
	let count = 0;

	row.forEach(value => {
			if (value === 1) count++;
			else if (count) {
				counts.push(count)
				count = 0;
			}
	});

	if (count) counts.push(count);
	if (counts.length === 0) return [0]
	return counts;
})

/**
 * Compares two 2D arrays and checks if they are identical in size and content.
 * 
 * @param {Array<Array<any>>} array1 - The first 2D array to compare.
 * @param {Array<Array<any>>} array2 - The second 2D array to compare.
 * @returns {boolean} Returns `true` if both arrays are identical (same size and content), otherwise returns `false`.
 */
export const compare2DArrays = (array1, array2) => {
	if (array1.length !== array2.length) return false; // Different number of rows
	return array1.every((row, rowIndex) => (
			row.length !== array2[rowIndex].length) ? 
			false: // Different number of columns in a row
			row.every((value, colIndex) => value === array2[rowIndex][colIndex]
		)
	);
}

/**
 * Compares two Nonograms and checks if they comply with the same clues.
 * 
 * @param {Array<Array<any>>} nonoArr1 
 * @param {Array<Array<any>>} nonoArr2 
 * @returns {boolean} Returns `true` if both nonos make up the same clues.
 */
export const compareNonograms = (nonoArr1, nonoArr2) => {
	let clueSet1 = {
		rows: createRowClues(nonoArr1), 
		cols: createColumnClues(nonoArr1)
	}
	let clueSet2 = {
		rows: createRowClues(nonoArr2), 
		cols: createColumnClues(nonoArr2)
	}
	
	return compare2DArrays(clueSet1.rows,clueSet2.rows) && compare2DArrays(clueSet1.cols,clueSet2.cols)
}

/**
 * Converts a 2D array into a string representation where each row is joined into a string.
 * The rows are then concatenated with a newline character.
 * 
 * @param {Array<Array<any>>} array - The 2D array to convert to a string.
 * @returns {string} A string representation of the 2D array, with each row on a new line.
 */
export const toString2DArray = (array) => {
	
	const arrayString = array.map(row => row.join('')).join('\n');
	return `${arrayString}`;
}
