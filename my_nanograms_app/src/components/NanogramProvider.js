import { useState, createContext, useContext } from 'react'

const NanogramContext = createContext()

const NanogramProvider = ({ children }) => {
	const [nanogram, setNanogram] = useState({
		size: 0,
		clue: {
			rows: [],
			cols: []
		}
	})
	
  const setNewNanogram = (nanogramValues) => {
		let size = nanogramValues.size
		let nanogramArr = generateNanogramArr(size)
		let clueRows = generateClueForRowsArr(nanogramArr)
		let clueCols = generateClueForCollumnsArr(nanogramArr)

    setNanogram({...nanogram, ...{
			size: size,
			clue: {
				rows: clueRows,
				cols: clueCols
			}
		}});
  };

	const generateNanogramArr = (size) => Array.from({ length: size }, () => Array.from({ length: size }, () => Math.round(Math.random())))
	const generateClueForCollumnsArr = (nanogramArr) => {
		return nanogramArr[0].map((_, col) => {
				const counts = [];
				let count = 0;
	
				for (const row of nanogramArr) 
					count = row[col] === 1 ? 
					count + 1 : 
					(count ? 
						(counts.push(count), 0) : 
						count
					)
				
	
				if (count) counts.push(count);
				return counts;
		});
	}
	const generateClueForRowsArr = (nanogramArr) => nanogramArr.map( row => {
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
		return counts;
	})

	return (
		<NanogramContext.Provider value={[nanogram, setNewNanogram]}>
			{children}
		</NanogramContext.Provider>
	);
};


export const useNanogramContext = () => {
	return useContext(NanogramContext);
};

export default NanogramProvider