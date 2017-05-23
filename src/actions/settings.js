import firebase from 'firebase';
import * as types from './types';

const db = firebase.database();

export const saveSettings = (id, val) => {
	return dispatch => {
		return new Promise((resolve, reject) => {
			db.ref("babyChets").child(id).update(val)
			.then(() => {
				dispatch({
					type: types.UPDATE_DB,
					payload: val,
				})
				resolve();
			})
			.catch(() => {
				reject();
			})
		})
	}	
}

