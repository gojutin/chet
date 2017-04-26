import * as types from './types';

export const generateResponse = (values, term, refKey, dispatch) => {
  var i = -1;

  // this is a recursive function that does the heavy lifting
  // of generating the most relevant response 
  const findMatch = () => {

    const inputValueSplitByWord = term.toLowerCase().split(" ");
    const wordSlice = inputValueSplitByWord.slice(0, i).join(" ");

    const inputValueSplitByChar = term.toLowerCase().split("");
    const charSlice = inputValueSplitByChar.slice(0, i).join("");

    const exactMatch = values.filter(value =>
      value.term.toLowerCase() === term
    );

    const matchedByWord = values.filter(value =>
      value.term.toLowerCase().includes(wordSlice)
    );

    const matchedByChar = values.filter(value =>
      value.term.toLowerCase().includes(charSlice)
    );

    if (exactMatch.length > 0) {
      // first option is an exact match of the inputValue with an existing value
      console.info("Match Strength- 100%")
      // console.log("best match", bestMatch[0])
      return exactMatch[0];

    } else if (matchedByWord.length > 0) {
      // second option is to check the inputValue against all values while removing
      // one word from the end of the inputValue at a time
      // i.e. "How are you?", "How are", "How" ...
      // console.log("Matched By Word", matchedByWord[0])
      console.info("Match Strength- " + Math.floor(charSlice.length / term.length * 100) + "%")
      return matchedByWord.sort((a, b) => b.term.length - a.term.length)[0];

    } else if (matchedByChar.length > 0) {
      // third option is to check the inputValue against all values while removing
      // one character from the end of the inputValue at a time
      // i.e. "Hi there", "Hi ther", "Hi the", "Hi th" ...
      // console.log("matchedByChar", matchedByChar[0])
      console.info("Match Strength- " + Math.floor(charSlice.length / term.length * 100) + "%")
      return matchedByChar.sort((a, b) => b.term.length - a.term.length)[0];

    } else if (charSlice.length === 0) {

      // third and final option is a random value
      const randomIndex = Math.floor(Math.random() * values.length);
      const randomValue = values[randomIndex];
      console.log("Match Strength- 0%")
      // console.log("random match", randomValue)
      return randomValue;

    } else {

      i -= 1
      return findMatch();
    }
  }

    const finalMatch = findMatch();

    // now that we have the closest match value, we sort it's responses by count
    const sortedResponses = () => {
      const sorted = finalMatch ? finalMatch.responses.sort((a, b) => b.count - a.count): false;
      if (!sorted) {
        return { term, id: refKey}
    } else {
        if (sorted.length < 3) {
            return sorted[0];
        } else if (sorted.length >=3 && sorted.length < 10 ) {
            const randomResponse = Math.floor(Math.random * 3)
            return sorted[randomResponse >= 0 ? randomResponse : 0];
        } else {
            const randomResponse = Math.floor(Math.random * 5)
            return sorted[randomResponse >= 0 ? randomResponse : 0];
        }
      }
    };
  
  dispatch({
    type: types.LOADING,
    payload: false,
  });

  dispatch({
    type: types.GENERATE_RESPONSE,
    payload: {
      term: sortedResponses()["term"],
      id: sortedResponses()["id"],
    },
  });

  dispatch({
    type: types.START_TYPING,
    payload: 1
  });

  dispatch({
    type: types.HANDLE_INPUT_CHANGE,
    payload: "",
  });

}