import firebase from 'firebase';
import * as types from './types';

export const logout = () => {
  return dispatch => {
		return new Promise((resolve, reject) => {
			firebase.auth().signOut()
				.then(_ => {resolve()})
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
        console.log(err.reason? err.reason : err)
				dispatch({
					type: types.UPDATE_DB,
					payload: {loggingIn: false},
				})
      })
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
								name: profile.displayName,
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
					dispatch({
						type: types.GET_USER_INFO,
						payload: "",
					})						
				}
			});
		}
	}



