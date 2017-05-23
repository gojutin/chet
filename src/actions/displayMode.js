import * as types from './types';

export const handleDisplayMode = (displayMode) => {
  return dispatch => {
    if (!displayMode) {
      const rightNow = new Date().getHours();
      // toggle to night mode if it is between 7PM & 7AM
      if (rightNow >= 19 || rightNow <= 6) {
        dispatch({type: types.TOGGLE_NIGHT_MODE,})
      } else {dispatch({type: types.TOGGLE_DAY_MODE,})}
    } else if (displayMode === "night") {
      dispatch({type: types.TOGGLE_DAY_MODE,})
    } else if (displayMode === "day") {
      dispatch({type: types.TOGGLE_NIGHT_MODE,})
    }
  } 
}
