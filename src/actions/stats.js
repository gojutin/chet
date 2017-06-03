import * as types from './types';

export const getStats = (babyChetPhrases) => {

      const removeDuplicates = arr => {
        let i,
          len=arr.length,
          out=[],
          obj={};

        for (i=0;i<len;i++) {
          obj[arr[i]]=0;
        }
        for (i in obj) {
          out.push(i);
        }
        return out;
      };

      let wordsArr = [];
		  let wordsCount;
			babyChetPhrases.map(value => wordsArr.push(value.term));
		  const splitWords = wordsArr.join(" ").split(" ");
		  const dupsRemoved = removeDuplicates(splitWords);

      if (dupsRemoved.length < 2 && dupsRemoved[0] === "") {
        wordsCount = 0;
      } else {
        wordsCount = dupsRemoved.length;
      }

      const growthPercentage = ((wordsCount / 20000)*100).toFixed(1);

      const phase = () => {
        if ( wordsCount < 200 ) {
          return {
            level: 1,
            name: "baby bot",
          }
        } else if (wordsCount >= 200 && wordsCount < 2000) {
          return {
            level: 2,
            name: "tot bot",
          }
        } else if (wordsCount >= 2000 && wordsCount < 3000) {
          return {
            level: 3,
            name: "kid bot"
          }
        } else if (wordsCount >= 3000 && wordsCount < 20000) {
          return {
            level: 4,
            name: "teen bot"
          }
        } else if (wordsCount >= 20000) {
          return {
            level: 5,
            name: "full grown bot"
          }
			  }
		  }

       const stats = {
        wordsCount,
        phrasesCount: babyChetPhrases.length || 0,
        growthPercentage,
        phase: phase(),
      } 
      return stats;
}

export const getInitialStats = (babyChetPhrases, dispatch) => {
  return dispatch => {
    return new Promise(resolve => {
      let stats = getStats(babyChetPhrases);

      dispatch({
        type: types.UPDATE_PROFILE,
        payload: stats
      })
      resolve(babyChetPhrases);
    })
  }
}