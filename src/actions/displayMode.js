import * as types from './types';

export const handleNightMode = (nightMode) => {
  return dispatch => {
    if (nightMode === undefined) {
      const rightNow = new Date().getHours();
      // toggle to night mode if it is between 7PM & 7AM
      if (rightNow >= 19 || rightNow <= 6) {
        dispatch({type: types.TOGGLE_NIGHT_MODE,})
      } else {dispatch({type: types.TOGGLE_DAY_MODE,})}
    } else if (nightMode) {
      dispatch({type: types.TOGGLE_DAY_MODE,})
    } else if (!nightMode) {
      dispatch({type: types.TOGGLE_NIGHT_MODE,})
    }
  } 
}
