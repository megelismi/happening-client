import { SET_USER, SET_USER_ERROR } from "../constants/users";

const initialState = {
    user:      {},
    userError: null
};

const users = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER: {
            console.log('got to set user', action.user);

            const result = {
                ...state,
                user: action.user
            };

            console.log('state', result);

            return result;
        }

        case SET_USER_ERROR: {
            console.log('got to set user error', action.error);

            return {
                ...state,
                userError: action.error
            }
        }

        default:
            return state;
    }
};

export default users;