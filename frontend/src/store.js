import {createStore , combineReducers, compose, applyMiddleware} from 'redux';
import {productListReducer,productDetailReducer} from './reducers/productReducers';
import {cardReducer} from './reducers/cardReducer' ;
import {userAuthReducer} from './reducers/userAuthReducer'
import Cookie from 'js-cookie';

import thunk from 'redux-thunk'

const shoppingItems = Cookie.getJSON('shoppingItems') || []
const userInfo = Cookie.getJSON('userInfo') || null

const initialState = {cardReducer : {shoppingItems},userAuthReducer : {userInfo}};

console.log(initialState)


const reducer = combineReducers({
    productList : productListReducer,
    productDetail : productDetailReducer,
    cardReducer : cardReducer,
    userAuthReducer : userAuthReducer,
})


const store = createStore(reducer,initialState,compose(applyMiddleware(thunk)))

export default store