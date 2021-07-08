import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

// Initializing Firebase/framework
export const initializeLogInFramework = () => {
    // Handling error using if/else
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }else {
        firebase.app();
    }
}





// Google login Authentication
export const getGoogleAuth = () => {

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
        const {displayName, email} = res.user;
        const signedInUser = {
            isSignIn: true,
            name: displayName,
            email: email,
            success: true
        };
        return signedInUser 
    }).catch((error) => {
        console.log(error)
        console.log(error.message)
        
    });
}

// Signed Out
export const getSignedOut = () => {
    return firebase.auth().signOut()
    .then(res => {
        const signedInUser = {
            isSignIn: false,
            name: '',
            email: '',
            success: false
        }
        return signedInUser;
    }).catch(error => {
        console.log(error)
        console.log(error.message)
    });
}


// Create account with Email and Password
export const getCreateAccountWithEmail = (name, email, password) => {
   return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.success = true;
        newUserInfo.error = '';

        return newUserInfo;
    })
    .catch(error => {
        const newUserInfo = {};
        newUserInfo.success = false;
        newUserInfo.error = error.message;

        return newUserInfo;
        
    });
}



// Sign In with Email and Password
export const getSignInWithEmail = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    })
}
