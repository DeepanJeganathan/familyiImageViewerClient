import {applyMiddleware, createStore} from 'redux'
import memberReducer from './member/memberReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(memberReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;