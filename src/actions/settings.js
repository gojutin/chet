// import firebase from 'firebase';
// import * as types from './types';

// const db = firebase.database();

// export const updateSettings = (id, val) => {
// 	return dispatch => {
// 		return new Promise((resolve, reject) => {
// 			db.ref("profiles").child(id).update(val)
// 			.then(() => {
// 				dispatch({
// 					type: types.UPDATE_PROFILE,
// 					payload: val,
// 				})
// 				resolve();
// 			})
// 			.catch(() => {
// 				reject();
// 			})
// 		})
// 	}	
// }

