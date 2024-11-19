import { create2DArray, createRowClues, createColumnClues} from './Array_functions/arrayFunctions.js'

const emptyBoard = {
	size: 0,
	nonogramArr: [],
	clue: {
		rows: [],
		cols: []
	}
}

/**
 * Generates Nonogram
 * 
 * @param {number} size - The size of the 2D array (both rows and columns will have this size).
 * @param {string} difficulty - The difficulty off the nonogram.
 * @returns {Array<Array<any>>} A 2D array of the specified size filled with 0's or 1's makeing up the nonogram
 */
const generateNonogram = (size,difficulty) => {
	
	const createNonogramArr = () => create2DArray(size, () => Math.round(Math.random()))


	//Create Nonogram
	let nonoArr = createNonogramArr()
	let clueRows = createRowClues(nonoArr)
	let clueCols = createColumnClues(nonoArr)

	//Make Nonos easir
	//Difficulty checker. intToFind = to minium number must exsist in 2d array
	let isCluesEasy = () => { }
	let minimumClueTarget = Math.ceil(size / 2)
	switch (difficulty) {
		case "normal":
		default:
			isCluesEasy = (array2D, intToFind) => array2D.some(subArray => subArray.some(num => num >= intToFind))
			minimumClueTarget = Math.ceil(size / 2)
			break;
	}



	while (!(isCluesEasy(clueRows, minimumClueTarget) && isCluesEasy(clueCols, minimumClueTarget))) {
		nonoArr = createNonogramArr()
		clueRows = createRowClues(nonoArr)
		clueCols = createColumnClues(nonoArr)
	}
	// console.log(isCluesEasy(clueRows,minimumClueTarget) && isCluesEasy(clueCols,minimumClueTarget))

	const nonogramBoard = {...emptyBoard,
		size: size,
		nonogramArr: nonoArr,
		clue: {
			rows: clueRows,
			cols: clueCols
		}
	};

	return nonogramBoard;
}

export default generateNonogram;