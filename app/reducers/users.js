import { TEST_ACTION } from "../actions/users";

const usersReducer = (state = {}, action) => {
    switch(action.type) {
        case TEST_ACTION: {
            return action.payload;
        }

        default:
            return state;
    }
};

export default usersReducer;