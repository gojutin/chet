import firebase from 'firebase';
import * as types from './types';
const db = firebase.database();

export const logout = () => {
  return dispatch => {
		return new Promise((resolve, reject) => {
			firebase.auth().signOut()
				.then(_ => {
					dispatch({type: types.CLEAR_DB})
					dispatch({type: types.BABY_CHET_MODE, payload: false})
					resolve()
				})
				.catch(error => {
					console.log("Oops, something went wrong. Please try again.")
				});
		});
  }
}

export const login = (providerName) => {
  return dispatch => {
		dispatch({
			type: types.UPDATE_DB,
			payload: {loggingIn: true},
		})

    let provider;
    switch(providerName) {
			case "facebook":
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case "google":
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      case "twitter":
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case "github":
        provider = new firebase.auth.GithubAuthProvider();
        break;
      default:
        break;
    }
    firebase.auth().signInWithPopup(provider)
      .then((res) =>{
				dispatch({
					type: types.UPDATE_DB,
					payload: {loggingIn: false},
				})
			})
      .catch(err => {
        console.log(err.message ? err.message : err)
				
      })
    }
  }

	export const deleteUserAccount = (id) => {
		return dispatch => {
			const user = firebase.auth().currentUser;
				user.delete().then( _ =>  {
					console.log("deleted")
					dispatch({
						type: types.CLEAR_DB,
					})
					dispatch({
						type: types.BABY_CHET_MODE,
						payload: false,
					})
					db.ref("babyChets").child(id).remove();
				}, err => {
					console.log(err)
						alert(err.message)
				});
	}
		}


	export const authWatch = () => {
		return dispatch => {
  		firebase.auth().onAuthStateChanged( (user) => {
				if (user) {
					if (user != null) {
						let userInfo = {};
						user.providerData.forEach(profile => {
							userInfo = {
								provider: profile.providerId,
								uid: profile.uid,
								userName: profile.displayName,
								email: profile.email,
								photo: profile.photoURL,
							}
							return dispatch({
								type: types.UPDATE_DB,
								payload: userInfo,
							})
						});
					}
				} else {
					dispatch({
						type: types.RESET_DB,
					})					
				}
			});
		}
	}



