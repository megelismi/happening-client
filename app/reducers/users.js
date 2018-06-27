import { SET_USER, SET_USER_ERROR } from "../constants/users";

const initialState = {
    user:      {},
    userError: null
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER: {
            console.log('got to set user', action.user);

            return {
                ...state,
                user: action.user
            }
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

export default usersReducer;