import { createStore, compose } from 'redux';

import rootReducer from '../reducers/root';

const enhancerList = [];

const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
    enchancerList.push(devToolsExtension());
}

const composedEnhancer = compose(...enhancerList);

const initStore = () => createStore(rootReducer, {}, composedEnhancer);

module.exports = {
    initStore
};