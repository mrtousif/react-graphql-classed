import React from "react";
// import { useStorageState } from "react-storage-hooks";
import jwtDecode from "jwt-decode";

const initialState = { user: null };

const UserContext = React.createContext({
    user: null,
    login: (userData) => {},
    logout: () => {},
});

const token = localStorage.getItem("token");
if (token && token.length > 10) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
    } else {
        initialState.user = decodedToken;
        initialState.user.token = token;
    }
}

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };

        default:
            return state;
    }
}

function UserProvider(props) {
    const [state, dispatch] = React.useReducer(authReducer, initialState);
    // const [token, setToken, writeError] = useStorageState(
    //     localStorage,
    //     "token",
    //     ""
    // );

    // if (writeError) {
    //     console.log(writeError);
    // }

    const login = (userData) => {
        dispatch({
            type: "LOGIN",
            payload: userData,
        });
        localStorage.setItem("token", userData.token);
        // setToken(userData.token)
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
        // setToken("")
    };

    return (
        <UserContext.Provider value={{ user: state.user, login, logout }}>
            {props.children}
        </UserContext.Provider>
    );
}

UserProvider.context = UserContext;

export default UserProvider;
