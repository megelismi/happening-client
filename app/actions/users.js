import {
    SET_USER,
    SET_USER_ERROR
} from "../constants/users";

export const setUser = user => ({
    type: SET_USER,
    user
});

export const setUserError = error => ({
    type: SET_USER_ERROR,
    error
});
