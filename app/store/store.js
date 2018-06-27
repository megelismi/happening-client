import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers/root';

const store = createStore(reducer, composeWithDevTools(
    // other store enhancers if any
));

export default store;