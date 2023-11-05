import { singInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        // const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
        // dispatch(login({
        //     uid: user.uid,
        //     email: user.email,
        //     displayName: user.displayName,
        //     photoURL: user.photoURL,
        // }));
    }
}


export const startGoogleSingIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await singInWithGoogle();
        
        if (!result.ok) return dispatch(logout(result.errorMessage));

        delete result.ok;
        return dispatch(login(result));
    }
}

export const startCreateUserWithEmailAndPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({ uid, displayName, email, photoURL}));
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password });
        console.log(result);

        if ( !result.ok ) return dispatch( logout( result ) );
        dispatch( login( result ));

    }
}


export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();

        dispatch( logout() );

    }
}